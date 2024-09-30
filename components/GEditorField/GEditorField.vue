<script setup lang="ts">
import { Editor, EditorContent } from '@tiptap/vue-3'
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
import { EXTENSIONS } from '~/components/GEditorField/constants/extensions'

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
      <div class="button-group flex gap-3">
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
      <div class="button-group flex flex-wrap gap-3">
        <el-button
          @click="
            editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()
          "
        >
          Добавить таблицу
        </el-button>
        <el-button @click="editor.chain().focus().addColumnBefore().run()">
          Добавить колонку слева
        </el-button>
        <el-button @click="editor.chain().focus().addColumnAfter().run()">
          Добавить колонку справа
        </el-button>
        <el-button @click="editor.chain().focus().deleteColumn().run()">
          Удалить колонку
        </el-button>
        <el-button @click="editor.chain().focus().addRowBefore().run()">
          Добавить строку выше
        </el-button>
        <el-button @click="editor.chain().focus().addRowAfter().run()">
          Добавить строку ниже
        </el-button>
        <el-button @click="editor.chain().focus().deleteRow().run()"> Удалить строку </el-button>
        <el-button @click="editor.chain().focus().deleteTable().run()"> Удалить таблицу </el-button>
        <el-button @click="editor.chain().focus().mergeCells().run()">
          Объединить ячейки
        </el-button>
        <el-button @click="editor.chain().focus().splitCell().run()"> Разделить ячейки </el-button>
        <el-button @click="editor.chain().focus().toggleHeaderColumn().run()">
          Выделить колонку
        </el-button>
        <el-button @click="editor.chain().focus().toggleHeaderRow().run()">
          Выделить строку
        </el-button>
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

.container :deep(.button-group + .button-group) {
  @apply py-3;
}

.container :deep(.button-group .el-button) {
  @apply m-0;
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

.container :deep(.tableWrapper table) {
  border-collapse: collapse;
  margin: 0;
  overflow: hidden;
  table-layout: fixed;
  width: 100%;
}

.container :deep(.tableWrapper td),
.container :deep(.tableWrapper th) {
  border: 1px solid theme('colors.amber.500');
  box-sizing: border-box;
  min-width: 1em;
  padding: 6px 8px;
  position: relative;
  vertical-align: top;
}

.container :deep(.tableWrapper th > *),
.container :deep(.tableWrapper td > *) {
  margin-bottom: 0;
}

.container :deep(.tableWrapper th) {
  background-color: theme('colors.amber.500');
  font-weight: bold;
  text-align: left;
}

.container :deep(.tableWrapper .selectedCell:after) {
  background: theme('colors.amber.500');
  content: '';
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  pointer-events: none;
  position: absolute;
  z-index: 2;
}

.container :deep(.tableWrapper .column-resize-handle) {
  background-color: theme('colors.amber.500');
  bottom: -2px;
  pointer-events: none;
  position: absolute;
  right: -2px;
  top: 0;
  width: 4px;
}

.container :deep(.tableWrapper) {
  margin: 1.5rem 0;
  overflow-x: auto;
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
