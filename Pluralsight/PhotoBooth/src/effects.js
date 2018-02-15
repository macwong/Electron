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
    }
};

exports.getEffectList = () => {
    return [
        "vanilla",
        "ascii",
        "daltonize",
        "hex"
    ];
};

exports.choose = (seriously, src, target, effectName = "vanilla") => {
    effects[effectName](seriously, src, target);
};