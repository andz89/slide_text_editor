
	// More info about initialization & config:
			// - https://revealjs.com/initialization/
			// - https://revealjs.com/config/
			Reveal.initialize({
				hash: true,
				center:false,
        controls: true,
				// margin:0,
				// width:"100%",
				// height:"100%",

				// Learn about plugins: https://revealjs.com/plugins/
				plugins: [ RevealMarkdown, RevealHighlight, RevealNotes ]
			});


var toolbarOptions = [
  ['link', 'image','video','formula'],
  ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
  ['blockquote', 'code-block'],

  [{ 'header': 1 }, { 'header': 2 }],               // custom button values
  [{ 'list': 'ordered'}, { 'list': 'bullet' }],
  [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
  [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
  [{ 'direction': 'rtl' }],                         // text direction

  [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
  [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

  [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
  [{ 'font': [] }],
  [{ 'align': [] }],

  
  ['clean']                                         // remove formatting button
];
function imageHandler(){
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
                  
                  
  var editor = new Quill('#editor', {
      theme: 'snow',
      modules: {
              toolbar:  {

   
        container:toolbarOptions,
        
        handlers: {
          
          image: this.imageHandler
        },
      },
          imageResize: {}
      }
  });
  


  let hide = false
  let show_toolbar = document.querySelector('#show_toolbar')
  show_toolbar.addEventListener('click',()=>{
  document.querySelector('#editor').style.display = 'block'
  document.querySelector('.ql-toolbar').style.display = 'block'
  hide = false
  
  })
  
  document.querySelector('.reveal').addEventListener('click', ()=>{
  if(hide == false){
  document.querySelector('#editor').style.display = 'none'
  document.querySelector('.ql-toolbar').style.display = 'none'
  show_toolbar.style.display = 'inline-block'
  hide = true
  }
  
  })
  
  

  
let refresh = document.querySelector('.refresh')
refresh.addEventListener('click', ()=>{
  var delta = editor.getContents();

 

 
var text = editor.getText();
var justHtml = editor.root.innerHTML;
document.querySelector('.present').innerHTML = justHtml

})


Reveal.on( 'slidechanged', event => {
       
const value =  document.querySelector('.present').innerHTML
editor.clipboard.dangerouslyPasteHTML(value)


  } );

//add slide
document.querySelector('.add_slide').addEventListener('click',()=>{
   let section = document.createElement('section')
    section.innerText ="new slide"
    document.querySelector('.slides').append(section)
    Reveal.next()
})
// text alignment
document.querySelector('.text_align').addEventListener('change',(e)=>{
document.querySelector('.present').style.textAlign= e.target.value
 
})





