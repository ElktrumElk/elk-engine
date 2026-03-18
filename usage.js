import CreateEnv from "./script.js";


CreateEnv(() => {
    ```
  
    @class header {
        --color = white;
        --backgroundColor = black;
        --fontFamily = sans-serif;
        --textAlign = center;
        --borderRadius = 2rem;
        --width = 90%;
        --display = flex;
        --justifyContent = space-between;
        --alignItems = center;
        --padding = 1rem, 1rem
    };

    @class logo {
        --fontSize = 1rem;

       
    };

    @class btn {
        --width = 5rem;
        --padding = .1rem, 1rem;
        --background = blue;
        --color = white;
        --border = none;
    }

    HTML <$>

            <header class="header">
                <h1 class="logo">Elktrum Elk</h1>
                <button class="btn">Contact Me</button>
            </header>


        </$>    
    ```
})