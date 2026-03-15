
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
 *  --(classname).color = "blue";
 * }
 * ```
 */

function CreateEnv(cb) {

    /**Holds the classes */
    let __classes = new Array();

    const lines = cb.toString().split("\r\n");
    let lineCount = 0;

    let __elements = new Array();


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
    
    let __CLASSNAME = [...l.trim().toString().matchAll(/@class\s*([\s\S]*?)\{/g)];
    console.log(__CLASSNAME);

    /**Check for given html*/
    let __HTML = [...l.toString().trim().matchAll(/HTML\s*\<\$>([\s\r\S]*?)<\/\$>/g)][0][1];

    /**Get The conditional Script Block */
    const __SCRIPTBLOCK = [...__HTML.toString().trim().matchAll(__SCRIPTBLOCKPATTERN)];

    //console.log(__HTML); //debugging
    //console.log(__SCRIPTBLOCK); //debugging
    let _i = 0;

    /**Loop the blocks*/
    __SCRIPTBLOCK.forEach(__block => {
        try {
            _i += 1;
            let __execVal = eval(__block[1]);

            if (__execVal === undefined) {
                __execVal = "";
            };

            /**Replace conditional Block in the html block*/
            const __ClEANHTML = __HTML.replace(/\$=>\s*\(/g, "").replace(/\)\$/, "").replace(__block[1], __execVal); // replace conditional block
            __HTML = __ClEANHTML;

            if (_i === __SCRIPTBLOCK.length) {
                const doc = new DOMParser();
                const __parsDoc = doc.parseFromString(__ClEANHTML.toString(), "text/html");

                __parsDoc.body.childNodes.forEach(__node => {
                    if(__node.classList != undefined) {
                        if (__node.classList.value === "par"){
                            __node.style.color = "red";
                        }
                    };

                    const __IMPORTED = document.importNode(__node, true);
                    document.body.appendChild(__IMPORTED);
                    //console.log(__IMPORTED)
                });
            }
        }
        catch (e) {
            console.error(e)
        }
    })


    for (let ch of lines) {

        lineCount += 1;
        /**=====================THE CLASS SELECTOR============================
         * The @class is used to group html elements
         * 
         */
        if (ch.trim().startsWith("@class") && ch.trim().endsWith("{")) {
            if (!_isInClassBlock) {
                _isInClassBlock = true
                _isClassFound
            }
        }


        /**Comment: apply thes styles if any is given */
        if (ch.trim().startsWith("--")) {
            if (_isInClassBlock) {
                setTimeout(() => {

                    const __class = ch.trim().replace("--", "").replace(";", "").split(".")[0]
                    for (let __element of __elements) {
                        if (__element.classList.contains(__class)) {

                            const [_prop, _value] = ch.trim().replace("--", "").replace(";", "").split("=", 2);
                            const _refineProp = _prop.trim().split(".")[1];
                            let __style = `${_refineProp.trim().toString()}`

                            __element['style'][`${__style}`] = _value

                        }

                    }

                }, .1)

            }
        }

        if (ch.trim().startsWith("$")) {
            if (_isInClassBlock) {
                const __class = ch.trim().replace("$", "").replace("{", "").split(".")[0];

                setTimeout(() => {
                    for (let _el of __elements) {

                        if (_el.classList.contains(__class.trim())) {
                            let _line = "";
                            for (let c of lines) {
                                _line += c
                            };
                            const regex = new RegExp(`\\$${__class.trim()}\\s*\\{([\\s\\S]*?)\\}\\$`, "g");

                            const _block = [..._line.toString().trim().matchAll(regex)];

                            _block.forEach(b => {
                                let _exec = b[1]

                                if (b[1].toString().trim().includes("$.")) {
                                    _exec = _exec.toString().trim().replaceAll("$.", `_el.`).replaceAll("_el.)", "_el)");
                                }

                                eval(_exec)

                            })
                        }
                    }
                })
            }
        }

        if (ch.trim().endsWith("};")) {
            if (_isInClassBlock) {
                _isInClassBlock = false;
            }
        };

    };
    /**
     * ======================================ROOT===================================
     * ==============================================================================
     * ==============================================================================
     * The root
     */


    //=================================================================================

}

const keywords = ["@class", "HTML"]
CreateEnv(() => {
    ``` 
  
    @class header {
        --header.color = white;
        --header.backgroundColor = black;
        --header.padding = 1rem 1rem;
        --header.fontFamily = sans-serif;
        --header.textAlign = center;

    };


    @class par {
        --par.color = orange;

        $par {

            const name = "Elkanah Cole";
            document.body.addEventListener("click", (e) => {
                if ($.) {
                    const newPara = $.cloneNode(true);
                    document.body.appendChild(newPara);

                };
            })        
        }$

    };
    

    HTML <$>
            <h1 class="header">
                About me
            </h1>

            $=> (

                (() => {

                    if (name == "elk") {

                        return '<p class="par">My name is Elkanah Cole Know more about <a href="#">Me</a></p>';

                    }else {
                        return '<p class="par">Please Enter a valid name</p>'
                    }

                })()

            )$
            
            $=> (

                (() => { 
                    if (2==1) {
                        return '<p>yes 2 == 2</p>'; 
                    }
                }
                )();  

            )$

            <span>Come on</span>
        </$>    
    ```
})