This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Project structure

```shell
.
├── README.md                       # README file
├── .github                         # GitHub folder
├── .husky                          # Husky configuration
├── .storybook                      # Storybook folder
├── .vscode                         # VSCode configuration
├── public                          # Public assets folder
├── app                             # Next JS App (App Router)
│   ├── components                  # Shared UI components
│   ├── lib                         # Contains reusable utility functions and data fetching functions
│   ├── locales                     # Locales folder (i18n messages)
│   ├── models                      # Database models
│   ├── styles                      # Styles folder
│   ├── templates                   # Templates folder
│   ├── types                       # Type definitions
│   ├── utils                       # Utilities folder
│   ├── validations                 # Validation schemas
│   └── fonts.ts                    # Define fonts
├── tests
├── tailwind.config.js              # Tailwind CSS configuration
└── tsconfig.json                   # TypeScript configuration
```

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

### TODO List

- [ ] Update EC2 security group with P addresses of GitHub.

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## Deploy on AWS EC2

### Set up EC2 instance

1. Launch an instance with Ubuntu OS.
2. Connect to instance via SSH client.
3. Install `nvm` and Node.
4. Install `docker`.

```bash
   sudo apt-get install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
```

5. Add user (default: ubuntu) to docker group.

```bash
   sudo usermod -aG docker ubuntu

   # Logout and login again
   exit
```

## Reference

1. https://github.com/salimi-my/shadcn-ui-sidebar
2. https://www.themealdb.com/
3. https://200lab.io/blog/huong-dan-deploy-ung-dung-nextjs-voi-github-action/
4. https://docs.github.com/en/actions/writing-workflows/choosing-what-your-workflow-does/passing-information-between-jobs
5. https://stackoverflow.com/questions/63642807/how-can-i-find-the-right-inbound-rule-for-my-github-action-to-deploy-on-my-aws-e
6. https://blog.logrocket.com/diving-server-actions-next-js-14/
