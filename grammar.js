// (function (undefined) {

    function log (a, t) {
        if(!t) console.log(t ? t + " : " + a : a); // display only non typed logs
        if(t) console.log(t ? t + " : " + a : a); // display only typed logs
        if(t == "Warning") console.log(t ? t + " : " + a : a); // display only warning logs
        if(t == "Success") console.log(t ? t + " : " + a : a); // display only warning logs
    }

    function Grammar(){
        this.S = [];            // symbols
        this.SS = undefined;    // start symbol
        this.T = [];            // terminals
        this.NT = [];           // non terminals
        this.R = [];            // rules
    }

    function parseGrammarInput(input){
        log(input,"Start Parsing");
        var output = "" ;// output will contains the output string with errors
        // rules : 
        // token /a token|/e (/o token | /e)
        // token = \w
        // special char
        // /a == →
        // /e == ε
        // /o == |

        var g = new Grammar();

        // create all symbols in order
        var symbols = input.replace("\n"," ").split(" ");
        for(var i in symbols){
            if(symbols[i] != "/a" && symbols[i] != "/o" && g.S.indexOf(symbols[i]) == -1)
                g.S.push(symbols[i].replace(" ","").replace("\n",""));
        }

        log(g.S,"Created symbols");

        // separate sequence with linebreak
        var lines = input.split("\n");

        for(i in lines){
            var line = lines[i];
            if(line === "") {
                log("Line empty");
                continue;
            }


            log(line,"Line");

            var tokens = line.split(" ");
            if(tokens.length < 3){
                return log(tokens.join(" "), "Error parsing : wrong number of tokens in");
            } 
            if(tokens[1] != "/a"){
                return log(tokens[1], "Error parsing : should be /a");
            }

            // add the start symbol if it doesn't exist
            if(g.S.indexOf(tokens[0],0) == -1) {
                log(tokens[0],"Added in S");
                // g.NT.
            }

            // // add all the tokens after the arrow to the rules for the 
            // for (var i = 2; i < tokens.length; i++) {
            //     tokens[i]
            // };

        }


        


        log(output,"End Parsing");
        // return g;
    }

    function displayGrammar (grammar) { // grammar is received as a set of rules

        // // (1) replace all special sequence with the corresponding char
        // // replace /a with →
        // var parsedInput = input.replace(/\/a/gi,'→');
        // // replace /e with ε
        // parsedInput = parsedInput.replace(/\/e/gi,'ε');
        // // replace /o with |
        // parsedInput = parsedInput.replace(/\/o/gi,'|');


    }


// })();