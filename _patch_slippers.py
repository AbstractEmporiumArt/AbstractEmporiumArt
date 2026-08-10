import os, re

path='lissas-knitting.html'
txt=open(path,encoding='utf-8').read()

# Replace product card image and alt
txt=txt.replace(
    "<img src=\"lkc-product-photos/lkc-slippers.jpg\" alt=\"Lissa's Knitting Creationz handmade knitwear — brand logo\" loading=\"lazy\">",
    "<img src=\"lkc-product-photos/lkc-slippers-01a.png\" alt=\"Adult Medium cozy knit slippers — pair 1\" loading=\"lazy\">"
)

start=txt.find('<div class=\"about-carousel-track\">')
end=txt.find('</div>', start+len('<div class=\"about-carousel-track\">'))+len('</div>')
old=txt[start:end]
if not old:
    raise SystemExit('carousel track not found')

new_track='<div class=\"about-carousel-track\">\n' + '\n'.join([
    f'<figure class=\"about-slide\" style=\"scroll-snap-align:center;flex:0 0 100%;min-width:100%\"><img src=\"lkc-product-photos/lkc-slippers-{i:02d}{chr(96+j)}.png\" alt=\"Pair {i} view {j} — Adult Medium cozy knit slippers\" loading=\"lazy\"><figcaption>Pair {i} · View {j}</figcaption></figure>'
    for i in range(1,11)
    for j in range(1,4)
]) + '\n'

txt=txt[:start]+new_track+txt[end:]
open(path,'w',encoding='utf-8').write(txt)
print('patched lissas-knitting.html')
