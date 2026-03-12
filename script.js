/*```
function App() {
@class header;
@class par;

$header {
    ~backgroundColor = "blue";
    ~color = "white";

    this.addEventListener("click", () => {
        alert("hello world");
    });
}

$par {
    ~backgroundColor = "black";
    ~color = "white";
}

return (
    <h1 class=$header>Hello</h1>
    <p class=$par>Hello this is just a text</p>
)
}
```*/

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



    for (let ch of lines) {

        lineCount += 1;


        /**Check for the HTML keyword */
        if (ch.trim().startsWith("HTML") && ch.trim().endsWith("(")) {
            if (!_isInBody) {
                _isInBody = true;


            }

        }

        /**Comment: Extract the html elements */
        if (ch.trim().startsWith("<") && _isInBody) {
            let _element = ch.trim();
            const _doc = __parser.parseFromString(_element, "text/html");
            __elements.push(..._doc.body.children);

        };
        /**Comment: Check the end of the html block */
        if (ch.trim().startsWith(")")) {
            if (_isInBody) {
                _isInBody = false;
            }
        };

        /**Comment: Check for define classes */


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
                console.log(__class.trim())

                setTimeout(() => {
                    for (let _el of __elements) {

                        if (_el.classList.contains(__class.trim())) {
                            let _line = "";
                            for (let c of lines) {
                                _line += c
                            };
                            const regex = new RegExp(`\\$${__class.trim()}\\s*\\{([\\s\\S]*?)\\}\\$`, "g");
                            console.log(regex);
                            const _block = [..._line.toString().trim().matchAll(regex)];

                            _block.forEach(b => {
                                let _exec = b[1]

                                if (b[1].toString().trim().includes("$.")) {
                                    _exec = _exec.toString().trim().replaceAll("$.", `_el.`).replaceAll("_el.)", "_el)");
                                }
                                console.log(_exec)
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

    __elements.forEach(_el => {

        document.body.appendChild(_el);

    })

    //=================================================================================

}

const keywords = ["@class", "HTML"]
CreateEnv(() => {
    ``` 
    @blend($color) {
        --color = color;
    };

    @class header {
        --header.color = white;
        --header.backgroundColor = black;
        --header.padding = 1rem 1rem;
        --header.fontFamily = sans-serif;
        --header.textAlign = center;

        
        $header {  
            alert("yup")
        }$
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
    

    HTML (
        <h1 class="header">About me</h1>
        <p class="par">My name is Elkanah Cole Know more about <a href="#">Me</a></p>
        <p>My name is Elkanah Cole Know more about my <a href="#">Love</a></p>
    );
   
    
    ```
})