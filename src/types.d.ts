export interface CommandOption {
  name: string,
  description: string,
  typeLabel?: string,
  type?: any,
  defaultValue?: any,
}

export interface CommandMeta {
  summary: string,
  params?: CommandOption[],
  options?: CommandOption[],
}