import { IComment } from '@/types/api/comment.ts';
import { MCommentDisplayItem } from './MCommentDisplay.vue';
import { IExtraProps } from './MCommentDisplayItem.vue';

export const props = withDefaults(
defineProps<{
item: MCommentDisplayItem | Partial<IComment extends IExtraProps?  : >;
nicknameFontSize?: string | number;
contentFontSize?: string | number;
}>(),
{
nicknameFontSize: 1.3,
contentFontSize: 1.1,
}
);
