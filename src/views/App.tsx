import React from 'react';
import { LiveProvider, LiveEditor, LiveError, LivePreview } from 'react-live'
import { compileSync } from '@mdx-js/mdx'
import { MDXProvider } from '@mdx-js/react'
import removeImports from 'remark-mdx-remove-imports'
import removeExports from 'remark-mdx-remove-exports'
import rehypeKatex from 'rehype-katex';
import remarkMath from 'remark-math';
import './index.scss';
import "./katex.scss";
import { useAppDispatch } from "../hooks";
import loadCodeFromFile from '../features/editor/fileHandler';

interface AppProps {
	// PLACEHOLDER
}

const transformCode = (src: string) => {
	let compiled

	try {
		compiled = compileSync(src,
			{	
				jsx: true,
				remarkPlugins: [removeImports, removeExports, remarkMath],
				rehypePlugins: [rehypeKatex]
			})
		compiled.value = compiled.value.toString().replace("export default MDXContent;", "")
	} catch (e) {
		return ''
	}

	return `
			${compiled}
			render(
				<MDXProvider>
					<MDXContent {...props} />
				</MDXProvider>
			)
		`
}


const App = (props: AppProps) => {
	const dispatch = useAppDispatch();
	const [ file, setFile ] = React.useState<File|null>(null);

	React.useEffect(() => {
		if (file) dispatch(loadCodeFromFile(file));
	}, [file]);

	return <LiveProvider
		code={'# $\\sqrt{a^2 + b^2}$'}
		scope={{
			MDXProvider,
			props: {},
		}}
		noInline={true}
		transformCode={code => transformCode(code)}>
			<div className="editor-topbar">
				<input 
					type="file"
					accept=".mdx"
					onChange={e => setFile(e.target.files?.[0])}
				/>
			</div>
			<div className="editor-container">
				<div className="editor-live-editor">
					<LiveEditor />
				</div>
				<div className="editor-live-preview">
					<LivePreview />
				</div>
			</div>
			<div className="editor-live-error">
				<LiveError />
			</div>
	</LiveProvider>
}

export default App;
