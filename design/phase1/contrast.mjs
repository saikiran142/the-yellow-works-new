const c={sun:'#FFD52A',marigold:'#FF9F1C',dusk:'#16142B',twilight:'#2A2160',paper:'#FFFCF2',butter:'#FFF1B8',mint:'#2FD4A7',coral:'#FF5A36',cobalt:'#4456FF',white:'#FFFFFF'};
const L=h=>{const [r,g,b]=[1,3,5].map(i=>parseInt(h.slice(i,i+2),16)/255).map(v=>v<=.03928?v/12.92:((v+.055)/1.055)**2.4);return .2126*r+.7152*g+.0722*b};
const R=(a,b)=>{const [x,y]=[L(c[a]),L(c[b])].sort((p,q)=>q-p);return ((x+.05)/(y+.05))};
const pairs=[['dusk','sun'],['dusk','mint'],['dusk','marigold'],['dusk','coral'],['white','cobalt'],['white','coral'],['dusk','paper'],['dusk','butter'],['paper','twilight'],['sun','dusk'],['sun','paper'],['mint','paper'],['butter','paper'],['marigold','paper'],['dusk','cobalt'],['sun','twilight']];
for(const [f,b] of pairs){const r=R(f,b);console.log(`${f} on ${b}: ${r.toFixed(2)}  ${r>=7?'AAA':r>=4.5?'AA text':r>=3?'large text only':'no text'}`)}
