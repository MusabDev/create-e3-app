#! /usr/bin/env node

import * as p from '@clack/prompts'
import * as fs from 'fs'
import * as path from 'path'
import color from 'picocolors'

import { execShellCommand } from './utils'

async function main() {
  console.clear()

  p.intro(`${color.bgCyan(color.black(' create-e3-app '))}`)

  const { name, database, git, packageManager } = await p.group(
    {
      name: () =>
        p.text({
          message: 'What should we call your project?',
          placeholder: './e3-app',
          validate: (value) => {
            if (!value) {
              return 'Please enter a path.'
            }
            // If the directory is not empty
            if (fs.existsSync(value) && fs.readdirSync(value).length > 0) {
              return 'Please select a empty directory.'
            }
          },
        }),
      database: () => {
        return p.select({
          message: 'What database ORM would you like to use?',
          options: [
            { value: 'none', label: 'None' },
            { value: 'prisma', label: 'Prisma' },
          ],
          initialValue: 'none',
        })
      },
      git: () => {
        return p.select({
          message: 'Initialize a new git repository?',
          options: [
            { value: 'yes', label: 'Yes' },
            { value: 'no', label: 'No' },
          ],
          initialValue: 'yes',
        })
      },
      packageManager: () =>
        p.select({
          message: 'What package manager would you like to use?',
          initialValue: 'npm',
          options: [
            { value: 'npm', label: 'npm' },
            { value: 'pnpm', label: 'pnpm' },
            { value: 'yarn', label: 'yarn' },
            { value: 'bun', label: 'bun' },
          ],
        }),
    },
    {
      onCancel: () => {
        p.cancel('Installation cancelled.')
        process.exit(0)
      },
    },
  )

  const spinner = p.spinner()
  spinner.start(`Installing via ${packageManager}.`)

  // Installation
  if (!fs.existsSync(name)) fs.mkdirSync(name)

  fs.cpSync(path.join(__dirname, '../template/base'), name, {
    recursive: true,
  })
  fs.renameSync(path.join(name, '_gitignore'), path.join(name, '.gitignore'))
  await execShellCommand(`cd ${name} && ${packageManager} install`)

  if (database === 'none') {
    fs.cpSync(path.join(__dirname, '../template/extra/database/none'), name, {
      recursive: true,
    })
  }
  if (database === 'prisma') {
    fs.cpSync(path.join(__dirname, '../template/extra/database/prisma'), name, {
      recursive: true,
    })
    await execShellCommand(
      `cd ${name} && ${
        packageManager !== 'yarn'
          ? `${packageManager} install @prisma/client`
          : 'yarn add @prisma/client'
      } && ${
        packageManager !== 'yarn'
          ? `${packageManager} install -D prisma`
          : 'yarn add -D prisma'
      } && npx prisma generate`,
    )
  }

  if (git === 'yes') {
    await execShellCommand(
      `cd ${name} && git init && git add . && git commit -m "Initial commit from create-e3-app"`,
    )
  }

  spinner.stop(`Installation completed.`)
  let nextSteps = `cd ${name}\n${
    database === 'prisma' ? 'npx prisma generate\n' : ''
  }${packageManager} run dev`
  p.note(nextSteps, 'Next steps.')
  p.outro(
    `Problems? ${color.underline(
      color.cyan('https://github.com/musabdev/create-e3-app/issues'),
    )}`,
  )
}

main().catch(console.error)
