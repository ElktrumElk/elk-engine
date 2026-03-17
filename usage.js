import CreateEnv from "./script.js";


CreateEnv(() => {
    ```
  
    @class header {
        --color = white;
        --backgroundColor = black;
        --fontFamily = sans-serif;
        --textAlign = center;
        --borderRadius = 2rem;
        --width = 100%;
       
    };


    @class denied {
        --color = red;
    };
    
    @class fieldset {
        --backgroundColor = gray;
        --border = none;
        --display = flex;
        --flexDirection = column;
        --alignItems = center;
        --width = 10rem;
        --minHeight = 10rem;
    }

    @class granted {
        --color = green;
    };
    
    //id selector
    @id nme {
        $=> {
            nme.addEventListener("click", () => {
                
            });    
        }
    }

    HTML <$>
            <h1 class="header">
                Login
            </h1>


            <fieldset class="fieldset">
                <legend>Login</legend>

                <form id="form" >
        

                    <label for="name">Name: </label>
                    <input id="name" placeholder="Enter your name" type="text" required/>
                    <br>
                    <label for="password">Password: </label>
                    <input id="password" placeholder="Enteryour password" type="password" required/>
                    <br>

                    <button id="btn" type="submit">Submit</button>

                    $=> (
                        const f = () => {
                            
                            setTimeout(() => {
                                const nme = document.getElementById("name");
                                const pwd = document.getElementById("password");
                                const btn = document.getElementById("btn");
                                const form = document.getElementById("form");
                                
                                const state = false;
                                  
                                const p = updateSatet(state, '_$f()');

                                
                                function y(e) {
                                    
                                    e.preventDefault();

                                    if (nme.value === "elk" && pwd.value === "123456") {
                                        p.value = true;

                                        placeElement({
                                            _element: "<p class='granted'>Access Granted</p>", 
                                            childNode: nme
                                        });

                                    }
                                    else {
                                        p.value = false;  

                                        placeElement({
                                                _element: "<p class='denied'>Access denied</p>", 
                                                childNode: nme
                                        });
                                    };

                                }
                               
                            });     
                        };

                        f();
                        
                    )$

                       
                    

                </form>
            </fieldset>
        </$>    
    ```
})