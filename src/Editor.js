import React, { useEffect, useRef, useState } from 'react';
import './App.css';
import AceEditor from "react-ace";
import "ace-builds";
import "ace-builds/src-noconflict/mode-css";
import "ace-builds/src-noconflict/mode-html";
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/theme-chaos";
import "ace-builds/src-noconflict/ext-language_tools";
import "ace-builds/webpack-resolver";

const Editor = ({htmlStart, cssStart, initialSrc}) => {

  const htmlRef = useRef(null)
  const cssRef = useRef(null)
  const htmlButton = useRef(null)
  const cssButton = useRef(null)


  const [code, setCode] = React.useState(
    `.joyful{
      background:#F4FB0A;
      transform:rotate(45deg);
      width:100px;
      height:100px;
      margin:25px;
      border-radius:50% 0;
      box-shadow:2px 2px 3px #ccc;
    }`
  );

  const [answer, setAnswer] = useState(`background:green;`)
  const [srcDoc, setSrcDoc] = useState(` `);
  const [initialSrcDoc, setInitialSrcDoc] = useState(` `);
  const [html, setHtml] = useState(` `)
  const [css, setCss] = useState(` `)
  const [quizHtml, setQuizHtml] = useState(` `)
  const [quizCss, setQuizCss] = useState(` `)
  const [js, setJs] = useState(` `)
  
  function onChange(newValue) {
    console.log("change", newValue);
  }

  function handleChange(){
    // console.log(aceCode)
  }

  useEffect(() => {
    setQuizHtml(htmlStart)
    setQuizCss(cssStart)
    setInitialSrcDoc(
      `
        <html>
          <body>${htmlStart}</body>
          <style>${cssStart}</style>                
        </html>
      `
    )
  },[])

  useEffect(() => {
    const timeOut = setTimeout(() => {
    setSrcDoc(
      `
        <html>
          <body>${html}</body>
          <style>${css}</style>                
        </html>
      `
    )
    
    }, 350)
  }, [html, css, js])

  useEffect(() => {
    const timeOut = setTimeout(() => {
      if(css.replace(/\s+/g, "") === `.joyful{
        background:#F4FB0A;
        transform:rotate(45deg);
        width:100px;
        height:100px;
        margin:25px;
        border-radius:50% 0;
        box-shadow:2px 2px 3px #ccc;
      }`.replace(/\s+/g, "") && html.replace(/\s+/g, "") === `<div class="joyful"></div>`.replace(/\s+/g, "")){
        alert('success!');
      }
      }, 500)
    
  }, [css])


  function toHtml(){
    const cssDiv = cssRef.current
    const htmlDiv = htmlRef.current

    cssDiv.style.display = 'none'
    htmlDiv.style.display = 'block'
    htmlButton.current.classList.add('active')
    cssButton.current.classList.remove('active')
  }
  function toCss(){ 
    const cssDiv = cssRef.current
    const htmlDiv = htmlRef.current

    htmlDiv.style.display = 'none'
    cssDiv.style.display = 'block'
    htmlButton.current.classList.remove('active')
    cssButton.current.classList.add('active')
  }

  return(
    <div className='editor-wrap'>
      <div className='editors'>
        <div className='tabs'>
          <button  ref={htmlButton}  className='hmtlButton active' onClick={toHtml}>HTML</button>
          <button  ref={cssButton}  className='cssButton' onClick={toCss}>CSS</button>
        </div>
        <div ref={htmlRef} className='htmlPanel'>
          <AceEditor
          className="editor"
          mode="html"
          placeholder={quizHtml}          
          theme="chaos"
          onChange={(e) => {setHtml(e)}}
          name="UNIQUE_ID_OF_DIV"
          height='160px'          
          width='100%'
          editorProps={{ $blockScrolling: true }}
        />
      </div>
      <div ref={cssRef} className='cssPanel'>
        <AceEditor
          className="editor"
          mode="css"
          placeholder={quizCss}
          theme="chaos"
          onChange={(e) => setCss(e)}
          name="UNIQUE_ID_OF_DIV"
          height='160px'
          width='100%'            
          enableBasicAutocompletion='true'    
          editorProps={{ $blockScrolling: true }}
        />
      </div>
    {/* <AceEditor
      className="editor"
      mode="javascript"
      theme="chaos"
      onChange={(e) => setJs(e)}
      name="UNIQUE_ID_OF_DIV"
      height='100px'
      width='100%'      
      editorProps={{ $blockScrolling: true }}
    /> */}
    </div>
    <iframe
      id="my_iframe"      
      srcDoc={srcDoc}
      title="output"
      sandbox="allow-scripts"
      frameBorder="1"
      width="50%"
      height="200px"
    />
    </div>
  )
}

export default Editor