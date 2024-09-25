import Document from '@tiptap/extension-document'
import Paragraph from '@tiptap/extension-paragraph'
import Text from '@tiptap/extension-text'
import BulletList from '@tiptap/extension-bullet-list'
import OrderedList from '@tiptap/extension-ordered-list'
import ListItem from '@tiptap/extension-list-item'
import Heading from '@tiptap/extension-heading'
import Bold from '@tiptap/extension-bold'
import Italic from '@tiptap/extension-italic'
import HardBreak from '@tiptap/extension-hard-break'
import TextAlign from '@tiptap/extension-text-align'
import History from '@tiptap/extension-history'
import Gapcursor from '@tiptap/extension-gapcursor'
import Table from '@tiptap/extension-table'
import TableCell from '@tiptap/extension-table-cell'
import TableHeader from '@tiptap/extension-table-header'
import TableRow from '@tiptap/extension-table-row'

export const EXTENSIONS = [
  Document,
  Paragraph,
  Text,
  BulletList,
  OrderedList,
  ListItem,
  Heading,
  Bold,
  Italic,
  HardBreak,
  TextAlign.configure({
    types: ['heading', 'paragraph']
  }),
  History,
  Gapcursor,
  Table.configure({
    resizable: true
  }),
  TableRow,
  TableHeader,
  TableCell
]
