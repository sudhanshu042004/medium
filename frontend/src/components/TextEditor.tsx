import {
  MDXEditor,
  toolbarPlugin,
  KitchenSinkToolbar,
  listsPlugin,
  quotePlugin,
  headingsPlugin,
  linkPlugin,
  linkDialogPlugin,
  imagePlugin,
  tablePlugin,
  thematicBreakPlugin,
  frontmatterPlugin,
  codeBlockPlugin,
  sandpackPlugin,
  codeMirrorPlugin,
  directivesPlugin,
  AdmonitionDirectiveDescriptor,
  diffSourcePlugin,
  markdownShortcutPlugin,
  SandpackConfig,
  ConditionalContents,
  InsertCodeBlock,
  InsertSandpack,
  ChangeCodeMirrorLanguage,
  ShowSandpackInfo,
} from '@mdxeditor/editor'
import '@mdxeditor/editor/style.css'
import axios from 'axios'
import { useState } from 'react'
import Cookies from "js-cookie";
import { Button } from '@mui/material';

const allPlugins = (diffMarkdown: string) => [
  toolbarPlugin({ toolbarContents: () => <KitchenSinkToolbar /> }),
  listsPlugin(),
  quotePlugin(),
  headingsPlugin(),
  linkPlugin(),
  linkDialogPlugin(),
  // eslint-disable-next-line @typescript-eslint/require-await
  imagePlugin({ imageUploadHandler: async () => '/sample-image.png' }),
  tablePlugin(),
  thematicBreakPlugin(),
  frontmatterPlugin(),
  codeBlockPlugin({ defaultCodeBlockLanguage: 'txt' }),
  //sandpackPlugin({ sandpackConfig: reactSandpackConfig }),
  codeMirrorPlugin({ codeBlockLanguages: { js: 'JavaScript', css: 'CSS', txt: 'text', tsx: 'TypeScript' } }),
  directivesPlugin({ directiveDescriptors: [AdmonitionDirectiveDescriptor] }),
  diffSourcePlugin({ viewMode: 'rich-text', diffMarkdown }),
  markdownShortcutPlugin(),
]


export function TextEditor({ markdown }: { markdown: string }) {
  const [value, setValue] = useState(markdown);
  const titleMatch = value.match(/^# (.+)$/m);
  const title = titleMatch ? titleMatch[1] : "Untitled Blog";

  function handlePublish() {
    const token = Cookies.get("Authorisation");
    const data = {
      title,
      content: value,
      published: true,
    }
    const headers = {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token
    }
    console.log(data);

    axios
    .post(`http://localhost:8787/api/v1/blog`, data, {
      headers: headers,
    })
    .then((response) => {
      // alert(response.data.message);
      console.log("done" + response);
    })
    .catch((error) => {
      console.log("Error : " + error);
    });

  }

  return (<>
    <div className='m-3 flex justify-center items-center'>
      <Button onClick={handlePublish} variant='outlined'>Publish</Button>
    </div>
    <MDXEditor
      markdown={markdown}
      className="full-demo-mdxeditor"
      contentEditableClassName="prose max-w-full font-sans"
      plugins={allPlugins(markdown)}
      onChange={setValue}
    />
  </>
  )
}

export default TextEditor

