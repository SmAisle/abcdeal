import pathlib
d=pathlib.Path(__file__).parent
src=(d/'src.html').read_text()
logic=(d/'logic.js').read_text().replace("if(typeof module!=='undefined')","//")
out=src.replace('/*WORDS*/',(d/'words.js').read_text()).replace('/*LOGIC*/',logic)
(d.parent/'index.html').write_text(out)
print(len(out))
