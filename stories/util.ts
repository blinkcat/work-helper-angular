import { IGetStory } from '@storybook/angular';

/**
 * 创建一个带 markdown 描述的 story
 *
 * @export
 * @param {string} selector 组件的 selector
 * @param {string} [md=''] markdown
 * @returns {IGetStory}
 */
export function createStoryWithMarkdown(selector: string, md = ''): IGetStory {
  return () => ({
    template: `
      <div class="bc-markdown-comp">
        <${selector}></${selector}>
      </div>
      <markdown class="markdown-body bc-markdown">{{md}}</markdown>
    `,
    props: {
      md
    }
  });
}
