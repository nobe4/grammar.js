// (function (undefined) {

    function log (a, t) {
        // if(!t) console.log(t ? t + " : " + a : a); // display only non typed logs
        // if(t) console.log(t ? t + " : " + a : a); // display only typed logs
        // if(t == "Warning") console.log(t ? t + " : " + a : a); // display only warning logs
        // if(t == "Success") console.log(t ? t + " : " + a : a); // display only warning logs


        if(t == "Grammar"){
            var s = "";
            for(var i in a.R){
                s += a.R[i].NT + " → ";
                for(var j in a.R[i].G){
                    for (var k = 0; k < a.R[i].G[j].length; k++) {
                        if(a.R[i].G[j][k].toString() == "/e") s += "ε ";
                        else s += a.R[i].G[j][k].toString() + " ";
                    };

                    if(j != a.R[i].G.length - 1) s += "| ";
                }
                s += "\n";
            }
            console.log("Print grammar :");
            console.log(s);
        }

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
        // var symbols = input.replace("\n"," ").split(" ");
        // for(var i in symbols){
        //     if(symbols[i] != "/a" && symbols[i] != "/o" && g.S.indexOf(symbols[i]) == -1)
        //         g.S.push(symbols[i].replace(" ","").replace("\n",""));
        //     if(g.SS == null)
        //         g.SS = symbols[i].replace(" ","").replace("\n","");
        // }

        // console.log(g);

        // separate sequence with linebreak
        var lines = input.split("\n");

        for(var i = 0; i < lines.length; i++){
            log(i,"New line");
            var line = lines[i];

            // all rules one by one
            // if line is empty we
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

            log(tokens);
            var generation = [];

            for (var j = 0; j < tokens.length; j++) {
                var token = tokens[j];
                token.replace(/[ ]+/g,'');
                if(token.length == 0) continue;
                log(token,"New token")

                if(j === 0) {
                    if(i === 0){
                        log(token,"Start symbol");
                        g.SS = token;
                    } 
                    log(token,"New Non Terminal");
                    g.R[i] = {NT:token,G:[]};
                }else if(token != "/a") {
                    if(token == "/o") {
                        if(generation.length == 0){
                            log(line,"Error parsing : missing token before /o");
                            return;
                        }
                        log(generation,"New generation");
                        g.R[i].G.push(generation);
                        log(g.R[i].G.toString());
                        generation = [];
                    }
                else if(j == tokens.length - 1){
                    log(token,"Token added to generation");
                    generation.push(token.toString());
                    log(generation,"Last generation");
                    g.R[i].G.push(generation);
                    log(g.R[i].G.toString());
                }else{
                        log(token,"Token added to generation");
                        generation.push(token.toString());
                        log(generation.toString());
                    }
                }
            }
        }

        log(g,"Grammar");

        


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