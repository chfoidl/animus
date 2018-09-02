var Animus = require("./dist/animus.umd");
var Benchmark = require("benchmark");

var suite = new Benchmark.Suite();

var random = Math.random;
var e = Animus.bezierEasing(Animus.LINEAR);

suite
    .add("test", () => {
        e(random());
    })
    .on("cycle", function(event) {
        var log = String(event.target);
        if (typeof document !== "undefined")
            document.body.innerHTML += "<p><code>" + log + "</code></p>";
        else console.log(log);
    })
    .run();
