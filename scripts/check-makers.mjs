/* DRAAGHET fase 4 - maker UI, release gate and punctuation preflight */
import assert from 'node:assert/strict';
import {readFileSync,readdirSync} from 'node:fs';
import vm from 'node:vm';
const read=p=>readFileSync(p,'utf8');
const studio=read('makers-studio.js');
const onboarding=read('maker-onboarding.js');
const makerHtml=read('idee.html');
const makerCss=read('makers-studio.css');
const dashboard=read('makers-dashboard.html');
const dashJs=read('makers-dashboard.js');
const admin=read('maker-approval-admin.js');
const adminHtml=read('makers-aanvragen.html');
for(const [name,src] of [['makers-studio',studio],['onboarding',onboarding],['maker dashboard',dashJs],['admin approval',admin],['navigation',read('draaghet-menu.js')]]){
 new vm.Script(src,{filename:name});
}
assert.equal((studio.match(/\{name:'/g)||[]).length,6,'Makers Studio must have 6 steps');
assert.match(studio,/dh-stage-nav/,'Missing visual step indicator');
assert.match(studio,/aria-current/,'Missing accessible active step');
assert.match(studio,/maker_applications/,'Maker approval status not checked in studio');
assert.match(studio,/!approved/,'Unapproved makers must not submit ideas');
assert.match(studio,/maker_studio_settings/,'Release gate must be checked');
assert.match(studio,/submit-maker-idea/,'Must submit via secured Edge Function');
assert.doesNotMatch(studio,/\.from\(['"]ideas['"]\)\.insert/,'Never insert ideas directly from browser');
assert.match(onboarding,/maker_applications/,'Onboarding must display approval status');
assert.match(makerHtml,/dh-maker-release/,'Missing clear pre-launch notice');
assert.match(makerHtml,/makers-studio\.js\?v=4/,'Maker Studio cache not refreshed');
assert.match(makerHtml,/maker-onboarding\.js\?v=2/,'Maker onboarding cache not refreshed');
assert.match(makerHtml,/makers-studio\.css\?v=4/,'Studio styles not refreshed');
assert.match(makerCss,/dh-stage-nav-item/,'Step navigation styling missing');
assert.match(dashboard,/hub-approval/,'Maker approval indicator missing');
assert.match(dashJs,/maker_applications/,'Maker dashboard must read own approval status');
assert.match(admin,/admin_users/,'Admin access must be checked');
assert.match(admin,/maker_applications/,'Maker applications must be reviewed');
assert.match(adminHtml,/noindex,nofollow/,'Private admin page must not be indexed');
assert.match(adminHtml,/maker-approval-admin\.js\?v=1/);
const community=read('makers-community.js');
const publicProfile=read('maker.html');
new vm.Script(community,{filename:'makers-community.js'});
assert.match(community,/maker_showcase/,'Public maker designs must come from approved showcase');
assert.match(community,/\.eq\('is_live',true\)/,'Only live maker designs should render');
assert.match(community,/VOORBEELDWEERGAVE/,'Non-maker demo must be identified');
assert.match(publicProfile,/makers-community\.js\?v=3/,'Maker design renderer must be updated');
assert.match(dashJs,/hub-approval/,'Maker dashboard must render approval status');
assert.match(read('draaghet-menu.js'),/makers-aanvragen\.html/,'Admin maker-review link missing');

assert.doesNotMatch(makerHtml,/DRAAGHET\.\s+regelt/,'Brand punctuation issue in Makers Studio');
const sourceFiles=readdirSync('.').filter(p=>/\.(html|js)$/.test(p));
const bad=[];
for(const file of sourceFiles){
 const src=read(file);
 if(/DRAAGHET\.(?=\s+[a-zà-ÿ]|-)/g.test(src))bad.push(file);
}
assert.deepEqual(bad,[],'DRAAGHET dot found inside running sentences: '+bad.join(', '));
console.log('DRAAGHET fase 4 preflight OK: six-step Studio, approval gates, admin review, and correct brand punctuation.');
