

/**Holds the classes name*/
const __CLASSES = new Object();
const __ID = new Object();

export function updateSatet(value, func) {

    const proxy = new Proxy({ value }, {

        set(target, property, nvalue) {
            if (target[property] === nvalue) return true

            target[property] = nvalue;
            const __function = func.trim().replace("_$", "");
            __function;
            console.log("State change")
            return true;
        }
    });

    return proxy;
};

/**The element array for element update */
let __elm = new Array();

export function placeElement({ _element, childNode, isReplace = false }) {
    if (!isReplace) {
        const _DOM = new DOMParser()
        const _el = _DOM.parseFromString(_element.toString(), "text/html").body.children[0];

        __renderClass(_el, __CLASSES); //render class of the element if any is given
        __elm.push(_el);


        /**Replace the element with it updated value*/
        if (__elm.length > 1) {
            __elm[__elm.length - 2].replaceWith(_el);
        } else {
            childNode.after(_el);
        };

        /*Comment: this reduce the size of the array making it length to be fixed at 2*/
        if (__elm.length > 2) {
            __elm = __elm.filter(x => x !== __elm[__elm.length - 3])
        };

    }
    else {
        console.log("Under critical thinking");
    }
}

/**Render class====================================================================== */
function __renderClass(__node, __CLASSES) {

    if (__node.classList != undefined) {
        if (__node.classList.length !== 0) {
            if (__node.classList.value === __CLASSES[`${__node.classList.value}`].classname) {
                const _styles = __CLASSES[`${__node.classList.value}`].styles;
                _styles.forEach(style => {
                    const [_prop, _value] = style.toString().replace(/^--/g, "").replace(",", " ").split("=", 2);
                    __node.style[`${_prop}`] = _value;
                });
            }
        }
    }
}

/**Render Id=============================================================================================== */
function __renderId(__node, __ID) {

    if (__node.id !== undefined) {
        const __attr = __node.getAttribute("id");
        if (__ID[`${__attr}`]) {
            if (__ID[`${__attr}`].scripts.length > 0) {

                __ID[`${__attr}`].scripts.forEach(_script => {

                    const _refineScript = _script.replaceAll(`$${__attr}`, `__node`);
                    console.log(_refineScript)
                    eval(_refineScript);

                });
            }
        }
    }
}



/**
 * 
 * # CreateEnv
 * CreateEnv is a function that allows you to style, structure and functionality to you web in one file.
 * @param {any} cb 
 * ## Selectors
 * There are many selectors where as we have the class, id, decendant, universal, $.(element selector), which need to come after the symbol '@'.
 * ### The "class" Selector
 * The class selector groups all html that has the class name into one class.
 * #### usage
 * ```
 * class (classname) {
 *  --color = blue;
 * }
 * ```
 * 
 * ## Conditional Rendering or Scripting
 * Conditional Rendering or Scripting is a state where you controll which element should be render on the document
 * ### Example:
 * 
 * ```
 * $=> (
 *  if (1 == 1) {
 *      return "<p>Hello!</p>";
 *  }else {
 *      return "<p>Bye!</p>";
 *  }
 * )
 * 
 * ```
 */
export default function CreateEnv(cb) {

    /**split the cb */
    const lines = cb.toString().split("\r\n");

    let __elements = new Array();

    /**Docuemnt parser for external use */
    let parseDoc;

    /**Check wether a body an html was given*/
    let _isInBody = false;

    /**Chech wether in a class block*/
    let _isInClassBlock = false;

    /**Comment: Check if class was found */
    let _isClassFound = false;

    /**The html parser */
    const __parser = new DOMParser();

    let l = "";

    for (let c of lines) {
        l += c;
    };
    /**==============================REGEX======================= */
    /**THIS SEARCH FOR js scripts withing the $=>()*/
    const __SCRIPTBLOCKPATTERN = /\$=>\s*\(([\s\S\r]*?)\)\$/g;
    /**THIS SEARCHES FOR HTML BLOCK */
    const __HTMLBLOCKPATTERN = /HTML\s*\<\$>([\s\r\S]*?)<\/\$>/g;
    /**Class Search pattern */
    const __CLASSSNAMEEARCHPATTERN = /@class\s*([\s\S]*?)\{/g;
    const __CLASSBLOCKSEARCHPATTERN = /@class\s*([\s\S]*?)\{([\s\S\r]*?)\}/g

    /**Pattern to search for id */
    const __IDNAMESEARCHPATTERN = /@id\s*([\s\S]*?)\{/g;
    const __IDBLOCKSEARCHPATTERN = /@id\s*([\s\S]*?)\{([\s\S\r]*?)\}\$/g;

    /**Class search============================================================================= */
    let __CLASS = [...l.trim().toString().matchAll(/@class\s*([\s\S]*?)\{/g)];
    let __CLASSVAL = [...l.trim().toString().matchAll(__CLASSBLOCKSEARCHPATTERN)];

    __CLASS.forEach((_cls, _idx) => {

        if (_idx < __CLASSVAL.length) {

            const _value = __CLASSVAL[_idx][2].trim().replaceAll(" ", "").split(";");
            const _styles = _value.filter(x => x.startsWith("--"))

            
            /**Create the class object with it properties */
            const __CLASSNAME = _cls[1].trim();
            __CLASSES[__CLASSNAME] = {
                styles: _styles,
                classname: __CLASSNAME
            };
        }
    });

    /**ID search ====================================================================== */
    const __IDNAME = [...l.trim().toString().matchAll(__IDNAMESEARCHPATTERN)];
    const __IDSCRIPTBLOCK = [...l.trim().toString().matchAll(__IDBLOCKSEARCHPATTERN)];
    const _idscript = new Array();

    __IDNAME.forEach((_ID, _idx) => {

        const _IDname = _ID[1].trim();
        const _script = [...__IDSCRIPTBLOCK[_idx][2].toString().trim().matchAll(__SCRIPTBLOCKPATTERN)];
        const _styles = __IDSCRIPTBLOCK[_idx][2].trim().replaceAll(" ", "").split(";").filter(x => x.startsWith("--"));

        /**Create the id with it properties */
        __ID[_IDname] = {
            idname: _IDname,
            styles: _styles,
            scripts: [],
            element: null
        };

        /**Push in scripts */
        _script.forEach(_s => {
            _idscript.push(_s[1].trim());
            __ID[_IDname].scripts.push(_s[1].trim())
        });
    });


    /**Check for given html=====================================================================*/
    let __HTML = [...l.toString().trim().matchAll(/HTML\s*\<\$>([\s\r\S]*?)<\/\$>/g)][0][1];

    /**Get The conditional Script Block in the HTML body*/
    const __SCRIPTBLOCK = [...__HTML.toString().trim().matchAll(__SCRIPTBLOCKPATTERN)];

    //console.log(__HTML); //debugging
    //console.log(__SCRIPTBLOCK); //debugging
    let _i = 0;
    let __ClEANHTML;

    /**Loop the blocks*/
    __SCRIPTBLOCK.forEach(__block => {
        try {

            let __execVal = eval(__block[1]);

            if (__execVal === undefined) {
                __execVal = "";
            };

            /**Replace conditional Block in the html block*/
            __ClEANHTML = __HTML.replace(/\$=>\s*\(/g, "").replace(/\)\$/, "").replace(__block[1], __execVal); // replace conditional block
            __HTML = __ClEANHTML;

        }
        catch (e) {
            console.error(e)
        }
    });


    /**Create new dom parser */
    const doc = new DOMParser();
    const __parsDoc = doc.parseFromString(__HTML.toString(), "text/html");
    parseDoc = __parsDoc;
    //console.log(__parsDoc.body.querySelectorAll("*"))

    /**===============================Apply class values======================== */
    Array.from(__parsDoc.body.querySelectorAll("*")).forEach(__node => {
        __renderClass(__node, __CLASSES);
    })



    __parsDoc.body.childNodes.forEach(__node => {

        /**Import the node */

        const __IMPORTED = document.importNode(__node, true);
        document.body.appendChild(__IMPORTED);

    });

    //**Apply script later */
    Array.from(document.body.querySelectorAll("*")).forEach(__n => {
        __renderId(__n, __ID);
    })
    //=================================================================================
}

const keywords = ["@class", "HTML"]
