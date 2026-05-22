# Git Workflow

## Branching Strategy
- `main` - Production ready code
- `develop` - Development branch
- `feature/*` - Feature branches
- `hotfix/*` - Hotfix branches

## Commit Message Convention
```
<type>(<scope>): <subject>

<body>

<footer>
```

Types: feat, fix, docs, style, refactor, test, chore

Example:
```
feat(backend): add image upload endpoint

Implements image upload to S3 bucket with validation
```

## Pull Request Process
1. Create feature branch from `develop`
2. Make changes and commit
3. Push to remote
4. Create pull request with description
5. Code review and approval
6. Merge to develop
7. Merge develop to main for releases

## Deployment Process
1. Test locally
2. Create PR for review
3. After approval, merge to develop
4. Run tests in staging
5. Merge to main
6. Deploy to production
