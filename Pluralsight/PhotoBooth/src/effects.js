function connectEffect(seriously, src, target, effect) {
    effect.source = src;
    target.source = effect;
    seriously.go();
}

const effects = {
    vanilla: (seriously, src, target) => {
        target.source = src;
        seriously.go();
    },
    ascii: (seriously, src, target) => {
        const ascii = seriously.effect("ascii");
        connectEffect(seriously, src, target, ascii);
    },
    daltonize: (seriously, src, target) => {
        const daltonize = seriously.effect("daltonize");
        daltonize.type = "0.8";
        connectEffect(seriously, src, target, daltonize);
    },
    hex: (seriously, src, target) => {
        const hex = seriously.effect("hex");
        hex.size = 0.03;
        connectEffect(seriously, src, target, hex);
    },
    filmgrain: (seriously, src, target) => {
        const filmgrain = seriously.effect("filmgrain");
        connectEffect(seriously, src, target, filmgrain);
    },
    kaleidoscope: (seriously, src, target) => {
        const kaleidoscope = seriously.effect("kaleidoscope");
        connectEffect(seriously, src, target, kaleidoscope);
    },
    nightvision: (seriously, src, target) => {
        const nightvision = seriously.effect("nightvision");
        connectEffect(seriously, src, target, nightvision);
    },
    sketch: (seriously, src, target) => {
        const sketch = seriously.effect("sketch");
        connectEffect(seriously, src, target, sketch);
    },
    vibrance: (seriously, src, target) => {
        const vibrance = seriously.effect("vibrance");
        connectEffect(seriously, src, target, vibrance);
    },
    scanlines: (seriously, src, target) => {
        const scanlines = seriously.effect("scanlines");
        connectEffect(seriously, src, target, scanlines);
    },
    
};

exports.getEffectList = () => {
    return [
        "vanilla",
        "ascii",
        "daltonize",
        "hex",
        "filmgrain",
        "kaleidoscope",
        "nightvision",
        "sketch",
        "vibrance",
        "scanlines"
    ];
};

exports.choose = (seriously, src, target, effectName = "vanilla") => {
    effects[effectName](seriously, src, target);
};