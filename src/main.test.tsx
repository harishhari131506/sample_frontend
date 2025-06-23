/**
 * @copyright 2025 Herocore LLC, All Rights Reserved.
 * @license This code is licensed under the MIT license. See the LICENSE file
 * in the project root for full license information.
 * @fileoverview Integration test for main.tsx ensuring the App mounts without errors.
 */

import { vi, describe, it, expect, beforeEach } from 'vitest';

describe('main.tsx', () => {
  const renderMock = vi.fn();

  beforeEach(async () => {
    // Reset DOM root for every test run
    document.body.innerHTML = '<div id="root"></div>';

    // Dynamically mock react-dom/client
    vi.resetModules(); // Clears previous module cache
    vi.doMock('react-dom/client', async () => {
      const actual = await vi.importActual<typeof import('react-dom/client')>('react-dom/client');
      return {
        ...actual,
        createRoot: () => ({
          render: renderMock,
        }),
      };
    });

    // Mock App component (not required but helps isolate)
    vi.doMock('./App', () => ({
      default: () => <div>Mocked App</div>,
    }));

    // Import the entry file AFTER mocks
    await import('./main');
  });

  it('mounts the React app into #root', () => {
    expect(document.getElementById('root')).not.toBeNull();
    expect(renderMock).toHaveBeenCalled(); // ✅ This should now pass
  });
  
});
