import * as p from '@clack/prompts'
import fs from 'fs'
import path from 'path'
import color from 'picocolors'

import { execShellCommand } from './utils'

const REPO_URL = 'https://github.com/musabdev/create-e3-app'

async function main() {
  console.clear()

  p.intro(`${color.bgGreen(color.black(' create-e3-app '))}`)

  const { name, database, packageManager } = await p.group(
    {
      name: () =>
        p.text({
          message: 'What should we call your project?',
          placeholder: './e3-app',
          validate: (value) => {
            if (!value) {
              return 'Please enter a path.'
            }
            // If directory is not exists, create it
            if (!fs.existsSync(value)) {
              fs.mkdirSync(value)
            }
            // If the directory is not black
            if (fs.readdirSync(value).length > 0) {
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
      packageManager: () =>
        p.select({
          message: 'What package manager would you like to use?',
          initialValue: 'npm',
          options: [
            { value: 'npm', label: 'npm' },
            { value: 'pnpm', label: 'pnpm' },
            { value: 'yarn', label: 'yarn' },
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
  fs.cpSync(path.join(__dirname, '../template/base'), name, {
    recursive: true,
  })
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
        packageManager === 'npm' || packageManager === 'pnpm'
          ? `${packageManager} install @prisma/client`
          : 'yarn add @prisma/client'
      } && ${
        packageManager === 'npm' || packageManager === 'pnpm'
          ? `${packageManager} install -D prisma`
          : 'yarn add -D prisma'
      }`,
    )
  }

  spinner.stop(`Installation completed.`)
  let nextSteps = `cd ${name}\n${packageManager} run dev`
  p.note(nextSteps, 'Next steps.')
  p.outro(
    `Problems? ${color.underline(
      color.green('https://github.com/musabdev/create-e3-app/issues'),
    )}`,
  )
}

main().catch(console.error)
