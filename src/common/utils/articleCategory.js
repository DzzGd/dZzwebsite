import { dateFormat } from './apptools'
export const articleNo = {
  HTML: '001',
  CSS: '002',
  JAVASCRIPT: '003',
  VUE: '004',
  NODE: '005',
  REACT: '006',
  SCSS: '007',
}
export const totalTags = ['vue', 'css', 'html', 'javascript', 'node', 'react', 'webpack', 'express', 'koa', 'ssr', 'vue-cli', 'typescript']

export function composeArticleNumber(head) {
  const bodyTime = dateFormat(new Date(), 'yyyyMMddhhmmss')
  return head + bodyTime
}
