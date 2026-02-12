'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import type { Config, GitHubData } from '@github-readme-stylist/core';
import { fetchGitHubDataForUser, renderReadmeFromDataAction } from '../actions';

export function useReadmePreview(config: Config) {
  const [fullPreview, setFullPreview] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState('');
  const [gitHubData, setGitHubData] = useState<GitHubData | null>(null);
  const [fetchedUsername, setFetchedUsername] = useState('');
  const fullRenderId = useRef(0);

  useEffect(() => {
    if (fetchedUsername && config.username !== fetchedUsername) {
      setGitHubData(null);
      setFullPreview('');
    }
  }, [config.username, fetchedUsername]);

  useEffect(() => {
    if (!gitHubData) return;
    const timer = setTimeout(async () => {
      const requestId = ++fullRenderId.current;
      try {
        const result = await renderReadmeFromDataAction(config, gitHubData);
        if (requestId !== fullRenderId.current) return;
        if (result.success && result.content) {
          setFullPreview(result.content);
          setError('');
        } else {
          setError(result.error || 'An error occurred while generating the preview');
        }
      } catch (e: any) {
        if (requestId === fullRenderId.current) {
          setError('An error occurred while generating the preview');
        }
      }
    }, 500);
    return () => clearTimeout(timer);
  }, [config, gitHubData]);

  const generateFull = useCallback(async () => {
    if (!config.username) {
      setError('GitHub Username is required');
      return;
    }
    setError('');
    setIsGenerating(true);
    try {
      const dataResult = await fetchGitHubDataForUser(config.username);
      if (!dataResult.success || !dataResult.data) {
        setError(dataResult.error || 'An error occurred. Please try again.');
        return;
      }
      setGitHubData(dataResult.data);
      setFetchedUsername(config.username);
      const renderResult = await renderReadmeFromDataAction(config, dataResult.data);
      if (renderResult.success && renderResult.content) {
        setFullPreview(renderResult.content);
      } else {
        setError(renderResult.error || 'An error occurred while generating the preview');
      }
    } catch (e: any) {
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  }, [config]);

  return { fullPreview, isGenerating, error, generateFull };
}

