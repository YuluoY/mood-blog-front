import { Themes } from "md-editor-v3"
import { EnumStatus } from "../core/index.ts"

export type EditorLanguage = 'zh-CN' | 'en-US'
export type EditorPreviewTheme = 'default' | 'github' | 'vuepress' | 'mk-cute' | 'smart-blue' | 'cyanosis'
export type EditorCodeTheme = 'atom' | 'a11y' | 'github' | 'gradient' | 'kimbie' | 'paraiso' | 'qtcreator' | 'stackoverflow'

export interface IEditorOptions {
  [key: string]: any
  theme: Themes
  language: EditorLanguage
  previewTheme: EditorPreviewTheme
  codeTheme: EditorCodeTheme
  showCodeRowNumber: boolean
}

export interface IWriteForm {
  title: string
  content: string
  cover: string
  status: EnumStatus
}