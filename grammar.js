// (function (undefined) {

    function log (a, t) {
        if(!t) console.log(t ? t + " : " + a : a); // display only non typed logs
        if(t) console.log(t ? t + " : " + a : a); // display only typed logs
        if(t == "Warning") console.log(t ? t + " : " + a : a); // display only warning logs
        if(t == "Success") console.log(t ? t + " : " + a : a); // display only warning logs
        if(t == "Grammar"){
            var s = "";
            for(var i in a.R){
                s += a.R[i].NT + " → ";
                for(var j in a.R[i].G){
                    for (var k = 0; k < a.R[i].G[j].length; k++) {
                        if(a.R[i].G[j][k].toString() == "/e") s += "ε ";
                        else s += a.R[i].G[j][k].toString() + " ";
                    }

                    if(j != a.R[i].G.length - 1) s += "| ";
                }
                s += "\n";
            }
            console.log("Print grammar :");
            console.log(a);
            console.log(s);
        }
    }

    function Grammar(){
        this.S = [];            // symbols : value, type[NT/T]
        this.SS = undefined;    // start symbol
        this.R = [];            // rules
        this.Fi = [];           // firsts
        this.Fo = [];           // follows
    }

    function parseGrammarInput(input){
        log(input,"Start Parsing");
        
        var output = "no error" ;// output will contains the output string with errors
        
        // rules : 
        // token /a token|/e (/o token | /e)
        // token = \w
        // special char
        // /a == →
        // /e == ε
        // /o == |

        var g = new Grammar();

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
                if(token.length === 0) continue;
                log(token,"New token");

                if(j === 0) {
                    if(i === 0){
                        log(token,"Start symbol");
                        g.SS = token;
                    } 
                    log(token,"New Rule");
                    g.R[i] = {NT:token,G:[]};
                }else if(token != "/a") {
                    if(token == "/o") {
                        if(generation.length === 0){
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




        log("starting add in S");
        console.log(g.S);
        // add all symbols
        for(i = 0; i < g.R.length; i++){
            var tmpR = g.R[i];
            log(tmpR.NT,"New symbol");

            if(g.S.indexOf(tmpR.NT) == -1) g.S.push(tmpR.NT);

            for (var j = 0; j < tmpR.G.length; j++) {
                var tmpGs = tmpR.G[j];
                for (var k = 0; k < tmpGs.length; k++) {
                    var tmpG = tmpGs[k];
                    if(g.S.indexOf(tmpG) == -1) g.S.push(tmpG);
                }
            }
        }

        // convert symbols to objects with type
        for(i = 0; i < g.S.length; i++){
            var S = g.S[i];
            g.S[i] = {value : S, type : "T"};
            for(var j = 0; j < g.R.length; j++){
                if(g.R[j].NT == S){
                    g.S[i].type = "NT";
                }
            }
        }

        log(g,"Grammar");

        log(output,"End Parsing");
        displayGrammar(g);
        // calculateFiFo(g);
    }

    function displayGrammar (g) { // grammar is received as a set of rules
        // replace all special sequence with the corresponding char
        // replace /a with →
        // replace /e with ε
        // replace /o with |

        $("#output").empty();

        for(var i in g.R){
            $("#output").append("<font color='blue'>"+g.R[i].NT+" </font>");
            $("#output").append("<font color='black'>→ </font>");
            for(var j in g.R[i].G){
                for (var k = 0; k < g.R[i].G[j].length; k++) {
                    if(g.R[i].G[j][k].toString() == "/e")
                        $("#output").append("<font color='black'>ε </font>");
                    else{
                        var index = g.S.reduce(function(previous,current, index){
                            if(current.value == g.R[i].G[j][k] && previous == -1) return index;
                            return previous;
                        },-1);
                        if(g.S[index].type == "NT")
                            $("#output").append("<font color='blue'>"+g.S[index].value+" </font>");
                        else
                            $("#output").append("<font color='red'>"+g.S[index].value+" </font>");
                    }
                }

                if(j != g.R[i].G.length - 1)
                    $("#output").append("<font color='black'>| </font>");
            }
            $("#output").append("<br>");
        }

    }

    function calculateFiFo(g){

        for (var i = 0; i < g.S.length; i++) {
            // If X is a terminal then First(X) is just X
            log(g.S[i] + g.T.indexOf(g.S[i]));
            if(g.T.indexOf(g.S[i]) != -1 && g.S[i] != "/e")
                g.Fi[i] = g.S[i];


        }

        console.log(g);

        // If there is a Production X → ε then add ε to first(X)
        
        // If there is a Production X → Y1Y2..Yk then add first(Y1Y2..Yk) to first(X)
        // First(Y1Y2..Yk) is either
        //      First(Y1) (if First(Y1) doesn't contain ε)
        //      OR (if First(Y1) does contain ε) then First (Y1Y2..Yk) is everything in First(Y1) <except for ε > as well as everything in First(Y2..Yk)
        // If First(Y1) First(Y2)..First(Yk) all contain ε then add ε to First(Y1Y2..Yk) as well.
    }


// })();