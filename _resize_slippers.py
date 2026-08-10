import os, re, shutil, subprocess

src_dir = 'current slippers on fb marketplace'
dst_dir = 'lkc-product-photos'
os.makedirs(dst_dir, exist_ok=True)

files = sorted(os.listdir(src_dir))
pairs = {}
for f in files:
    m = re.search(r'slippers?pair(\d+)(?:-(\d))?\.png$', f)
    if m:
        pnum = int(m.group(1))
        view = m.group(2) or '1'
        pairs.setdefault(pnum, {})[view] = f

for pnum in sorted(pairs):
    views = pairs[pnum]
    for i, view in enumerate(sorted(views), 1):
        src_f = os.path.join(src_dir, views[view])
        final_f = os.path.join(dst_dir, f'lkc-slippers-{pnum:02d}{chr(96+i)}.png')
        cmd = ['ffmpeg', '-y', '-i', src_f, '-vf', 'scale=1080:-1:flags=lanczos', final_f]
        subprocess.run(cmd, capture_output=True)
        if os.path.exists(final_f):
            print(f'created {final_f}')
        else:
            print(f'FAILED {src_f}')

print('done', sum(len(v) for v in pairs.values()), 'files')
