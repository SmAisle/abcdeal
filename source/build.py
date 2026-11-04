import pathlib
d=pathlib.Path(__file__).parent
src=(d/'src.html').read_text()
logic=(d/'logic.js').read_text().replace("if(typeof module!=='undefined')","//")
out=src.replace('/*WORDS*/',(d/'words.js').read_text()).replace('/*LOGIC*/',logic)
out=out.replace('/*DEMOCSS*/',(d/'demo-frame.css').read_text()).replace('/*DEMOJS*/',(d/'demo-frame.js').read_text()+(d/'demo.js').read_text())
(d.parent/'index.html').write_text(out)
print(len(out))
