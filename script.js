

			Reveal.initialize({
				hash: true,
				center:false,

				// plugins: [ RevealMarkdown, RevealHighlight, RevealNotes ]
			});


var toolbarOptions = [
  ['link', 'image','video'],
  ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
  ['blockquote'],
  // ['code-block'],

  // [{ 'header': 1 }, { 'header': 2 }],               // custom button values
  [{ 'list': 'ordered'}, { 'list': 'bullet' }],
  // [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
  // [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
  // [{ 'direction': 'rtl' }],                         // text direction

  // [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
  [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

  [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
  // [{ 'font': [] }],
  // [{ 'align': [] }],

  
  // ['clean']                                         // remove formatting button
];

  
  var BaseImageFormat = Quill.import('formats/image');
  const ImageFormatAttributesList = [
      'alt',
      'height',
      'width',
      'style'
  ];
  
  class ImageFormat extends BaseImageFormat {
    static formats(domNode) {
      return ImageFormatAttributesList.reduce(function(formats, attribute) {
        if (domNode.hasAttribute(attribute)) {
          formats[attribute] = domNode.getAttribute(attribute);
        }
        return formats;
      }, {});
    }
    format(name, value) {
      if (ImageFormatAttributesList.indexOf(name) > -1) {
        if (value) {
          this.domNode.setAttribute(name, value);
        } else {
          this.domNode.removeAttribute(name);
        }
      } else {
        super.format(name, value);
      }
    }
  }
  



  Quill.register(ImageFormat, true);
 // Import the format

import { Video } from './library/video-resize.js'


// register with Quill
Quill.register({ 'formats/video': Video });





                  
  var editor = new Quill('#editor', {
      theme: 'snow',
      modules: {
              toolbar:  {

   
        container:toolbarOptions,
        
        handlers: {
          
          image: function imageHandler(){
            console.log('sfsd')
             const input = document.createElement('input');
           
             input.setAttribute('type', 'file');
             input.setAttribute('accept', 'image/*');
             input.click();
           
             input.onchange = async () => {
               const file = input.files[0];
               const formData = new FormData();
           
               formData.append('image', file);
           
               // Save current cursor state
               const range = this.quill.getSelection(true);
           
              
              //  const link = `${'sfs'}/file/${'adas222'}`
               const link = `tree.jpg`;
          
          
               // this part the image is inserted
               // by 'image' option below, you just have to put src(link) of img here. 
               this.quill.insertEmbed(range.index, 'image', link); 
             }
           }
        },
      },


    imageResize: {
      displaySize: true,
      toobar:true,
      displaySize:true
    },
      }
  });
  
  editor.root.quill = editor;

  let hide = false
  let show_toolbar = document.querySelector('#show_toolbar')
  show_toolbar.addEventListener('click',()=>{
   
    document.querySelector('#tools').style.transform = "translateY(0)";

  show_toolbar.style.display = 'none'
  hide = false
  
  })
  
let fontSize_value;
let textAlign_value;


  document.querySelector('.reveal').addEventListener('click', ()=>{
  if(hide == false){
  document.querySelector('#tools').style.transform = "translateY(-100%)";

  show_toolbar.style.display = 'inline-block'
  hide = true
  }
  // else{
  // document.querySelector('#tools').style.transform = "translateY(0)";
  // show_toolbar.style.display = 'none'
  // hide = false
  // }
  // reload()
  })
  
  
function reload(){

  var justHtml = editor.root.innerHTML;
  document.querySelector('.present').innerHTML = justHtml
}
  
let apply = document.querySelector('.apply')
apply.addEventListener('click', ()=>{
  reload()
})


Reveal.on( 'slidechanged', event => {
       
const value =  document.querySelector('.present').innerHTML
editor.clipboard.dangerouslyPasteHTML(value)
document.querySelector('#tools').style.transform = "translateY(-100%)";
editor.root.blur()
show_toolbar.style.display = 'block'

  } );

  

//add slide
document.querySelector('.add_slide').addEventListener('click',()=>{
   let section = document.createElement('section')
    section.innerText ="new slide"
    section.attribute = 'data-transition="slide-in fade-out"'
    document.querySelector('.slides').append(section)
    Reveal.next()
    //current settings
    document.querySelector('.present').style.textAlign= textAlign_value 
    document.querySelector('.present').style.fontSize = fontSize_value
})


// text alignment
document.querySelector('#text_align').addEventListener('change',(e)=>{
  textAlign_value = e.target.value
document.querySelector('.present').style.textAlign= textAlign_value 
 
})

//font size
document.querySelector('#font_size').addEventListener('change',(e)=>{
fontSize_value = e.target.value + 'px'
  document.querySelector('.present').style.fontSize = fontSize_value
   
  })




//event change on text editor
// editor.on('text-change', function(delta, source) {
  
//     reload()

// });
// editor.on('selection-change', function(range) {
//   reload()

// });

editor.on('editor-change', function(eventName, ...args) {

  // reload()
});



document.querySelector('#editor').style.height=window.innerHeight - 200 + 'px'
