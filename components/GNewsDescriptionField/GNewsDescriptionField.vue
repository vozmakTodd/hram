<script setup lang="ts">
import BulletList from '@tiptap/extension-bullet-list'
import Document from '@tiptap/extension-document'
import ListItem from '@tiptap/extension-list-item'
import OrderedList from '@tiptap/extension-ordered-list'
import Paragraph from '@tiptap/extension-paragraph'
import Text from '@tiptap/extension-text'
import { Editor, EditorContent } from '@tiptap/vue-3'
import Heading from '@tiptap/extension-heading'
import Bold from '@tiptap/extension-bold'
import Italic from '@tiptap/extension-italic'
import HardBreak from '@tiptap/extension-hard-break'
import History from '@tiptap/extension-history'
import TextAlign from '@tiptap/extension-text-align'
import type { JSONContent } from '@tiptap/core'
import GHeaderIcon from '~/components/icons/GHeaderIcon.vue'
import GBoldIcon from '~/components/icons/GBoldIcon.vue'
import GItalicIcon from '~/components/icons/GItalicIcon.vue'
import GParagraphIcon from '~/components/icons/GParagraphIcon.vue'
import GBulletListIcon from '~/components/icons/GBulletListIcon.vue'
import GNumberListIcon from '~/components/icons/GNumberListIcon.vue'
import GUndoIcon from '~/components/icons/GUndoIcon.vue'
import GRedoIcon from '~/components/icons/GRedoIcon.vue'
import GTextAlignLeftIcon from '~/components/icons/GTextAlignLeftIcon.vue'
import GTextAlignRightIcon from '~/components/icons/GTextAlignRightIcon.vue'
import GTextAlignCenterIcon from '~/components/icons/GTextAlignCenterIcon.vue'
import GLineBreakIcon from '~/components/icons/GLineBreakIcon.vue'
import { EXTENSIONS } from '~/components/GNewsDescriptionField/constants/extensions'

const value = defineModel<JSONContent>()

const editor = new Editor({
  extensions: EXTENSIONS,
  editorProps: {
    attributes: {
      class: 'prose'
    }
  },
  content: value.value,
  onUpdate: () => {
    value.value = editor.getJSON()
  }
})

const isEmpty = () => {
  return editor.isEmpty
}

onBeforeUnmount(() => {
  editor.destroy()
})

defineExpose({
  isEmpty
})
</script>

<template>
  <div class="container">
    <div class="control-group">
      <div class="button-group flex">
        <el-button
          circle
          :icon="GBoldIcon"
          :disabled="!editor.can().chain().focus().toggleBold().run()"
          :class="{ 'is-active': editor.isActive('bold') }"
          @click="editor.chain().focus().toggleBold().run()"
        />
        <el-button
          circle
          :icon="GItalicIcon"
          :disabled="!editor.can().chain().focus().toggleItalic().run()"
          :class="{ 'is-active': editor.isActive('italic') }"
          @click="editor.chain().focus().toggleItalic().run()"
        />
        <el-button
          circle
          :icon="GParagraphIcon"
          :class="{ 'is-active': editor.isActive('paragraph') }"
          @click="editor.chain().focus().setParagraph().run()"
        />
        <el-button
          circle
          :icon="GLineBreakIcon"
          @click="editor.chain().focus().setHardBreak().run()"
        />
        <el-button
          circle
          :icon="GHeaderIcon"
          :class="{ 'is-active': editor.isActive('heading', { level: 3 }) }"
          @click="editor.chain().focus().toggleHeading({ level: 3 }).run()"
        />
        <el-button
          circle
          :icon="GBulletListIcon"
          :class="{ 'is-active': editor.isActive('bulletList') }"
          @click="editor.chain().focus().toggleBulletList().run()"
        />
        <el-button
          circle
          :icon="GNumberListIcon"
          :class="{ 'is-active': editor.isActive('orderedList') }"
          @click="editor.chain().focus().toggleOrderedList().run()"
        />
        <el-button
          circle
          :icon="GTextAlignLeftIcon"
          :class="{ 'is-active': editor.isActive({ textAlign: 'left' }) }"
          @click="editor.chain().focus().setTextAlign('left').run()"
        />
        <el-button
          circle
          :icon="GTextAlignCenterIcon"
          :class="{ 'is-active': editor.isActive({ textAlign: 'center' }) }"
          @click="editor.chain().focus().setTextAlign('center').run()"
        />
        <el-button
          circle
          :icon="GTextAlignRightIcon"
          :class="{ 'is-active': editor.isActive({ textAlign: 'right' }) }"
          @click="editor.chain().focus().setTextAlign('right').run()"
        />
        <div class="ml-auto" />
        <el-button
          circle
          :icon="GUndoIcon"
          :disabled="!editor.can().chain().focus().undo().run()"
          @click="editor.chain().focus().undo().run()"
        />
        <el-button
          circle
          :icon="GRedoIcon"
          :disabled="!editor.can().chain().focus().redo().run()"
          @click="editor.chain().focus().redo().run()"
        />
      </div>
    </div>
    <editor-content class="pt-3" :editor="editor" />
  </div>
</template>

<style scoped lang="postcss">
.container {
  @apply rounded p-3;
  border: var(--el-border);
}

.container :deep(.button-group) {
  @apply pb-3;
  border-bottom: var(--el-border);
}

.container:hover {
  border-color: var(--el-border-color-hover);
}

.container:focus-within {
  border-color: var(--el-color-primary);
}

.container :deep(.ProseMirror:focus) {
  outline: none;
}

.container :deep(.ProseMirror) {
  max-width: unset;
}
</style>

<style lang="postcss">
.is-error .container {
  border-color: var(--el-color-danger);
}

.is-error .container:hover {
  border-color: var(--el-color-danger);
}
</style>
