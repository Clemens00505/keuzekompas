import nx from '@nx/eslint-plugin';

export default [
  ...nx.configs['flat/base'],
  ...nx.configs['flat/typescript'],
  ...nx.configs['flat/javascript'],
  {
    ignores: ['**/dist'],
  },
  {
    files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx'],
    rules: {
      '@nx/enforce-module-boundaries': [
        'error',
        {
          enforceBuildableLibDependency: true,
          allow: ['^.*/eslint(\\.base)?\\.config\\.[cm]?[jt]s$'],
          // Onion Architecture constraints
          depConstraints: [
            // Shared libs can only depend on other shared libs
            {
              sourceTag: 'scope:shared',
              onlyDependOnLibsWithTags: ['scope:shared'],
            },
            // Domain is the core: only depend on shared
            {
              sourceTag: 'layer:domain',
              onlyDependOnLibsWithTags: ['scope:shared', 'layer:domain'],
            },
            // Application depends on domain and shared
            {
              sourceTag: 'layer:application',
              onlyDependOnLibsWithTags: ['layer:domain', 'scope:shared', 'layer:application'],
            },
            // Interface (controllers, presenters) depends on application (and optionally domain) and shared
            {
              sourceTag: 'layer:interface',
              onlyDependOnLibsWithTags: [
                'layer:application',
                'layer:domain',
                'scope:shared',
                'layer:interface'
              ],
            },
            // Infrastructure depends on domain/application and shared
            {
              sourceTag: 'layer:infrastructure',
              onlyDependOnLibsWithTags: [
                'layer:application',
                'layer:domain',
                'scope:shared',
                'layer:infrastructure'
              ],
            },
            // Frontend libs can depend on other frontend libs and shared
            {
              sourceTag: 'scope:frontend',
              onlyDependOnLibsWithTags: ['scope:frontend', 'scope:shared'],
            },
            // Backend apps (composition root) may depend on any backend layer and shared
            {
              sourceTag: 'type:app-backend',
              onlyDependOnLibsWithTags: [
                'layer:interface',
                'layer:application',
                'layer:domain',
                'layer:infrastructure',
                'scope:shared'
              ],
            },
            // Frontend apps can depend on frontend libs and shared
            {
              sourceTag: 'type:app-frontend',
              onlyDependOnLibsWithTags: ['scope:frontend', 'scope:shared'],
            }
          ],
        },
      ],
    },
  },
  {
    files: [
      '**/*.ts',
      '**/*.tsx',
      '**/*.cts',
      '**/*.mts',
      '**/*.js',
      '**/*.jsx',
      '**/*.cjs',
      '**/*.mjs',
    ],
    // Override or add rules here
    rules: {},
  },
];
