(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))n(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const a of r.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&n(a)}).observe(document,{childList:!0,subtree:!0});function t(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(s){if(s.ep)return;s.ep=!0;const r=t(s);fetch(s.href,r)}})();const Fl="183",Ls={ROTATE:0,DOLLY:1,PAN:2},Ds={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},ju=0,Pc=1,Zu=2,cr=1,hf=2,or=3,Fi=0,un=1,Hn=2,pi=0,Us=1,_a=2,Dc=3,Ic=4,Ku=5,Ki=100,Ju=101,Qu=102,ed=103,td=104,nd=200,id=201,sd=202,rd=203,Ao=204,Co=205,ad=206,od=207,ld=208,cd=209,hd=210,fd=211,ud=212,dd=213,pd=214,Ro=0,Po=1,Do=2,Bs=3,Io=4,Lo=5,Uo=6,No=7,ff=0,md=1,gd=2,qn=0,uf=1,df=2,pf=3,mf=4,gf=5,_f=6,xf=7,vf=300,ts=301,zs=302,Va=303,Ga=304,Ra=306,Fo=1e3,di=1001,Oo=1002,Zt=1003,_d=1004,Rr=1005,$t=1006,Ha=1007,Qi=1008,yn=1009,yf=1010,Sf=1011,pr=1012,Ol=1013,Qn=1014,$n=1015,_i=1016,Bl=1017,zl=1018,mr=1020,Mf=35902,Ef=35899,bf=1021,wf=1022,Fn=1023,xi=1026,es=1027,Tf=1028,kl=1029,ks=1030,Vl=1031,Gl=1033,ca=33776,ha=33777,fa=33778,ua=33779,Bo=35840,zo=35841,ko=35842,Vo=35843,Go=36196,Ho=37492,Wo=37496,Xo=37488,$o=37489,Yo=37490,qo=37491,jo=37808,Zo=37809,Ko=37810,Jo=37811,Qo=37812,el=37813,tl=37814,nl=37815,il=37816,sl=37817,rl=37818,al=37819,ol=37820,ll=37821,cl=36492,hl=36494,fl=36495,ul=36283,dl=36284,pl=36285,ml=36286,xd=3200,Af=0,vd=1,Pi="",Tn="srgb",Vs="srgb-linear",xa="linear",at="srgb",hs=7680,Lc=519,yd=512,Sd=513,Md=514,Hl=515,Ed=516,bd=517,Wl=518,wd=519,gl=35044,Uc="300 es",Yn=2e3,gr=2001;function Td(i){for(let e=i.length-1;e>=0;--e)if(i[e]>=65535)return!0;return!1}function va(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function Ad(){const i=va("canvas");return i.style.display="block",i}const Nc={};function ya(...i){const e="THREE."+i.shift();console.log(e,...i)}function Cf(i){const e=i[0];if(typeof e=="string"&&e.startsWith("TSL:")){const t=i[1];t&&t.isStackTrace?i[0]+=" "+t.getLocation():i[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return i}function Fe(...i){i=Cf(i);const e="THREE."+i.shift();{const t=i[0];t&&t.isStackTrace?console.warn(t.getError(e)):console.warn(e,...i)}}function Je(...i){i=Cf(i);const e="THREE."+i.shift();{const t=i[0];t&&t.isStackTrace?console.error(t.getError(e)):console.error(e,...i)}}function Sa(...i){const e=i.join(" ");e in Nc||(Nc[e]=!0,Fe(...i))}function Cd(i,e,t){return new Promise(function(n,s){function r(){switch(i.clientWaitSync(e,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:s();break;case i.TIMEOUT_EXPIRED:setTimeout(r,t);break;default:n()}}setTimeout(r,t)})}const Rd={[Ro]:Po,[Do]:Uo,[Io]:No,[Bs]:Lo,[Po]:Ro,[Uo]:Do,[No]:Io,[Lo]:Bs};class as{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){const n=this._listeners;return n===void 0?!1:n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){const n=this._listeners;if(n===void 0)return;const s=n[e];if(s!==void 0){const r=s.indexOf(t);r!==-1&&s.splice(r,1)}}dispatchEvent(e){const t=this._listeners;if(t===void 0)return;const n=t[e.type];if(n!==void 0){e.target=this;const s=n.slice(0);for(let r=0,a=s.length;r<a;r++)s[r].call(this,e);e.target=null}}}const Jt=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],da=Math.PI/180,_l=180/Math.PI;function Li(){const i=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(Jt[i&255]+Jt[i>>8&255]+Jt[i>>16&255]+Jt[i>>24&255]+"-"+Jt[e&255]+Jt[e>>8&255]+"-"+Jt[e>>16&15|64]+Jt[e>>24&255]+"-"+Jt[t&63|128]+Jt[t>>8&255]+"-"+Jt[t>>16&255]+Jt[t>>24&255]+Jt[n&255]+Jt[n>>8&255]+Jt[n>>16&255]+Jt[n>>24&255]).toLowerCase()}function Ye(i,e,t){return Math.max(e,Math.min(t,i))}function Pd(i,e){return(i%e+e)%e}function Wa(i,e,t){return(1-t)*i+t*e}function Wn(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("Invalid component type.")}}function ct(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("Invalid component type.")}}const Dd={DEG2RAD:da};class Le{constructor(e=0,t=0){Le.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,n=this.y,s=e.elements;return this.x=s[0]*t+s[3]*n+s[6],this.y=s[1]*t+s[4]*n+s[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Ye(this.x,e.x,t.x),this.y=Ye(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=Ye(this.x,e,t),this.y=Ye(this.y,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Ye(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(Ye(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const n=Math.cos(t),s=Math.sin(t),r=this.x-e.x,a=this.y-e.y;return this.x=r*n-a*s+e.x,this.y=r*s+a*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class Oi{constructor(e=0,t=0,n=0,s=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=s}static slerpFlat(e,t,n,s,r,a,o){let l=n[s+0],c=n[s+1],h=n[s+2],u=n[s+3],f=r[a+0],d=r[a+1],g=r[a+2],v=r[a+3];if(u!==v||l!==f||c!==d||h!==g){let m=l*f+c*d+h*g+u*v;m<0&&(f=-f,d=-d,g=-g,v=-v,m=-m);let p=1-o;if(m<.9995){const y=Math.acos(m),w=Math.sin(y);p=Math.sin(p*y)/w,o=Math.sin(o*y)/w,l=l*p+f*o,c=c*p+d*o,h=h*p+g*o,u=u*p+v*o}else{l=l*p+f*o,c=c*p+d*o,h=h*p+g*o,u=u*p+v*o;const y=1/Math.sqrt(l*l+c*c+h*h+u*u);l*=y,c*=y,h*=y,u*=y}}e[t]=l,e[t+1]=c,e[t+2]=h,e[t+3]=u}static multiplyQuaternionsFlat(e,t,n,s,r,a){const o=n[s],l=n[s+1],c=n[s+2],h=n[s+3],u=r[a],f=r[a+1],d=r[a+2],g=r[a+3];return e[t]=o*g+h*u+l*d-c*f,e[t+1]=l*g+h*f+c*u-o*d,e[t+2]=c*g+h*d+o*f-l*u,e[t+3]=h*g-o*u-l*f-c*d,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,s){return this._x=e,this._y=t,this._z=n,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const n=e._x,s=e._y,r=e._z,a=e._order,o=Math.cos,l=Math.sin,c=o(n/2),h=o(s/2),u=o(r/2),f=l(n/2),d=l(s/2),g=l(r/2);switch(a){case"XYZ":this._x=f*h*u+c*d*g,this._y=c*d*u-f*h*g,this._z=c*h*g+f*d*u,this._w=c*h*u-f*d*g;break;case"YXZ":this._x=f*h*u+c*d*g,this._y=c*d*u-f*h*g,this._z=c*h*g-f*d*u,this._w=c*h*u+f*d*g;break;case"ZXY":this._x=f*h*u-c*d*g,this._y=c*d*u+f*h*g,this._z=c*h*g+f*d*u,this._w=c*h*u-f*d*g;break;case"ZYX":this._x=f*h*u-c*d*g,this._y=c*d*u+f*h*g,this._z=c*h*g-f*d*u,this._w=c*h*u+f*d*g;break;case"YZX":this._x=f*h*u+c*d*g,this._y=c*d*u+f*h*g,this._z=c*h*g-f*d*u,this._w=c*h*u-f*d*g;break;case"XZY":this._x=f*h*u-c*d*g,this._y=c*d*u-f*h*g,this._z=c*h*g+f*d*u,this._w=c*h*u+f*d*g;break;default:Fe("Quaternion: .setFromEuler() encountered an unknown order: "+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const n=t/2,s=Math.sin(n);return this._x=e.x*s,this._y=e.y*s,this._z=e.z*s,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,n=t[0],s=t[4],r=t[8],a=t[1],o=t[5],l=t[9],c=t[2],h=t[6],u=t[10],f=n+o+u;if(f>0){const d=.5/Math.sqrt(f+1);this._w=.25/d,this._x=(h-l)*d,this._y=(r-c)*d,this._z=(a-s)*d}else if(n>o&&n>u){const d=2*Math.sqrt(1+n-o-u);this._w=(h-l)/d,this._x=.25*d,this._y=(s+a)/d,this._z=(r+c)/d}else if(o>u){const d=2*Math.sqrt(1+o-n-u);this._w=(r-c)/d,this._x=(s+a)/d,this._y=.25*d,this._z=(l+h)/d}else{const d=2*Math.sqrt(1+u-n-o);this._w=(a-s)/d,this._x=(r+c)/d,this._y=(l+h)/d,this._z=.25*d}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<1e-8?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(Ye(this.dot(e),-1,1)))}rotateTowards(e,t){const n=this.angleTo(e);if(n===0)return this;const s=Math.min(1,t/n);return this.slerp(e,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const n=e._x,s=e._y,r=e._z,a=e._w,o=t._x,l=t._y,c=t._z,h=t._w;return this._x=n*h+a*o+s*c-r*l,this._y=s*h+a*l+r*o-n*c,this._z=r*h+a*c+n*l-s*o,this._w=a*h-n*o-s*l-r*c,this._onChangeCallback(),this}slerp(e,t){let n=e._x,s=e._y,r=e._z,a=e._w,o=this.dot(e);o<0&&(n=-n,s=-s,r=-r,a=-a,o=-o);let l=1-t;if(o<.9995){const c=Math.acos(o),h=Math.sin(c);l=Math.sin(l*c)/h,t=Math.sin(t*c)/h,this._x=this._x*l+n*t,this._y=this._y*l+s*t,this._z=this._z*l+r*t,this._w=this._w*l+a*t,this._onChangeCallback()}else this._x=this._x*l+n*t,this._y=this._y*l+s*t,this._z=this._z*l+r*t,this._w=this._w*l+a*t,this.normalize();return this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){const e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),s=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(s*Math.sin(e),s*Math.cos(e),r*Math.sin(t),r*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class O{constructor(e=0,t=0,n=0){O.prototype.isVector3=!0,this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(Fc.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(Fc.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,n=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6]*s,this.y=r[1]*t+r[4]*n+r[7]*s,this.z=r[2]*t+r[5]*n+r[8]*s,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,n=this.y,s=this.z,r=e.elements,a=1/(r[3]*t+r[7]*n+r[11]*s+r[15]);return this.x=(r[0]*t+r[4]*n+r[8]*s+r[12])*a,this.y=(r[1]*t+r[5]*n+r[9]*s+r[13])*a,this.z=(r[2]*t+r[6]*n+r[10]*s+r[14])*a,this}applyQuaternion(e){const t=this.x,n=this.y,s=this.z,r=e.x,a=e.y,o=e.z,l=e.w,c=2*(a*s-o*n),h=2*(o*t-r*s),u=2*(r*n-a*t);return this.x=t+l*c+a*u-o*h,this.y=n+l*h+o*c-r*u,this.z=s+l*u+r*h-a*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,n=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[4]*n+r[8]*s,this.y=r[1]*t+r[5]*n+r[9]*s,this.z=r[2]*t+r[6]*n+r[10]*s,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Ye(this.x,e.x,t.x),this.y=Ye(this.y,e.y,t.y),this.z=Ye(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=Ye(this.x,e,t),this.y=Ye(this.y,e,t),this.z=Ye(this.z,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Ye(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const n=e.x,s=e.y,r=e.z,a=t.x,o=t.y,l=t.z;return this.x=s*l-r*o,this.y=r*a-n*l,this.z=n*o-s*a,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return Xa.copy(this).projectOnVector(e),this.sub(Xa)}reflect(e){return this.sub(Xa.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(Ye(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y,s=this.z-e.z;return t*t+n*n+s*s}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){const s=Math.sin(t)*e;return this.x=s*Math.sin(n),this.y=Math.cos(t)*e,this.z=s*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),s=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=s,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const Xa=new O,Fc=new Oi;class Ve{constructor(e,t,n,s,r,a,o,l,c){Ve.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,s,r,a,o,l,c)}set(e,t,n,s,r,a,o,l,c){const h=this.elements;return h[0]=e,h[1]=s,h[2]=o,h[3]=t,h[4]=r,h[5]=l,h[6]=n,h[7]=a,h[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,s=t.elements,r=this.elements,a=n[0],o=n[3],l=n[6],c=n[1],h=n[4],u=n[7],f=n[2],d=n[5],g=n[8],v=s[0],m=s[3],p=s[6],y=s[1],w=s[4],M=s[7],D=s[2],R=s[5],L=s[8];return r[0]=a*v+o*y+l*D,r[3]=a*m+o*w+l*R,r[6]=a*p+o*M+l*L,r[1]=c*v+h*y+u*D,r[4]=c*m+h*w+u*R,r[7]=c*p+h*M+u*L,r[2]=f*v+d*y+g*D,r[5]=f*m+d*w+g*R,r[8]=f*p+d*M+g*L,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],a=e[4],o=e[5],l=e[6],c=e[7],h=e[8];return t*a*h-t*o*c-n*r*h+n*o*l+s*r*c-s*a*l}invert(){const e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],a=e[4],o=e[5],l=e[6],c=e[7],h=e[8],u=h*a-o*c,f=o*l-h*r,d=c*r-a*l,g=t*u+n*f+s*d;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);const v=1/g;return e[0]=u*v,e[1]=(s*c-h*n)*v,e[2]=(o*n-s*a)*v,e[3]=f*v,e[4]=(h*t-s*l)*v,e[5]=(s*r-o*t)*v,e[6]=d*v,e[7]=(n*l-c*t)*v,e[8]=(a*t-n*r)*v,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,s,r,a,o){const l=Math.cos(r),c=Math.sin(r);return this.set(n*l,n*c,-n*(l*a+c*o)+a+e,-s*c,s*l,-s*(-c*a+l*o)+o+t,0,0,1),this}scale(e,t){return this.premultiply($a.makeScale(e,t)),this}rotate(e){return this.premultiply($a.makeRotation(-e)),this}translate(e,t){return this.premultiply($a.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,n=e.elements;for(let s=0;s<9;s++)if(t[s]!==n[s])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const $a=new Ve,Oc=new Ve().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Bc=new Ve().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function Id(){const i={enabled:!0,workingColorSpace:Vs,spaces:{},convert:function(s,r,a){return this.enabled===!1||r===a||!r||!a||(this.spaces[r].transfer===at&&(s.r=mi(s.r),s.g=mi(s.g),s.b=mi(s.b)),this.spaces[r].primaries!==this.spaces[a].primaries&&(s.applyMatrix3(this.spaces[r].toXYZ),s.applyMatrix3(this.spaces[a].fromXYZ)),this.spaces[a].transfer===at&&(s.r=Ns(s.r),s.g=Ns(s.g),s.b=Ns(s.b))),s},workingToColorSpace:function(s,r){return this.convert(s,this.workingColorSpace,r)},colorSpaceToWorking:function(s,r){return this.convert(s,r,this.workingColorSpace)},getPrimaries:function(s){return this.spaces[s].primaries},getTransfer:function(s){return s===Pi?xa:this.spaces[s].transfer},getToneMappingMode:function(s){return this.spaces[s].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(s,r=this.workingColorSpace){return s.fromArray(this.spaces[r].luminanceCoefficients)},define:function(s){Object.assign(this.spaces,s)},_getMatrix:function(s,r,a){return s.copy(this.spaces[r].toXYZ).multiply(this.spaces[a].fromXYZ)},_getDrawingBufferColorSpace:function(s){return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(s=this.workingColorSpace){return this.spaces[s].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(s,r){return Sa("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),i.workingToColorSpace(s,r)},toWorkingColorSpace:function(s,r){return Sa("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),i.colorSpaceToWorking(s,r)}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],n=[.3127,.329];return i.define({[Vs]:{primaries:e,whitePoint:n,transfer:xa,toXYZ:Oc,fromXYZ:Bc,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:Tn},outputColorSpaceConfig:{drawingBufferColorSpace:Tn}},[Tn]:{primaries:e,whitePoint:n,transfer:at,toXYZ:Oc,fromXYZ:Bc,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:Tn}}}),i}const et=Id();function mi(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function Ns(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}let fs;class Ld{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let n;if(e instanceof HTMLCanvasElement)n=e;else{fs===void 0&&(fs=va("canvas")),fs.width=e.width,fs.height=e.height;const s=fs.getContext("2d");e instanceof ImageData?s.putImageData(e,0,0):s.drawImage(e,0,0,e.width,e.height),n=fs}return n.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=va("canvas");t.width=e.width,t.height=e.height;const n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);const s=n.getImageData(0,0,e.width,e.height),r=s.data;for(let a=0;a<r.length;a++)r[a]=mi(r[a]/255)*255;return n.putImageData(s,0,0),t}else if(e.data){const t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(mi(t[n]/255)*255):t[n]=mi(t[n]);return{data:t,width:e.width,height:e.height}}else return Fe("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let Ud=0;class Xl{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Ud++}),this.uuid=Li(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){const t=this.data;return typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):typeof VideoFrame<"u"&&t instanceof VideoFrame?e.set(t.displayHeight,t.displayWidth,0):t!==null?e.set(t.width,t.height,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const n={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let a=0,o=s.length;a<o;a++)s[a].isDataTexture?r.push(Ya(s[a].image)):r.push(Ya(s[a]))}else r=Ya(s);n.url=r}return t||(e.images[this.uuid]=n),n}}function Ya(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?Ld.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(Fe("Texture: Unable to serialize Texture."),{})}let Nd=0;const qa=new O;class nn extends as{constructor(e=nn.DEFAULT_IMAGE,t=nn.DEFAULT_MAPPING,n=di,s=di,r=$t,a=Qi,o=Fn,l=yn,c=nn.DEFAULT_ANISOTROPY,h=Pi){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Nd++}),this.uuid=Li(),this.name="",this.source=new Xl(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=s,this.magFilter=r,this.minFilter=a,this.anisotropy=c,this.format=o,this.internalFormat=null,this.type=l,this.offset=new Le(0,0),this.repeat=new Le(1,1),this.center=new Le(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Ve,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0}get width(){return this.source.getSize(qa).x}get height(){return this.source.getSize(qa).y}get depth(){return this.source.getSize(qa).z}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(const t in e){const n=e[t];if(n===void 0){Fe(`Texture.setValues(): parameter '${t}' has value of undefined.`);continue}const s=this[t];if(s===void 0){Fe(`Texture.setValues(): property '${t}' does not exist.`);continue}s&&n&&s.isVector2&&n.isVector2||s&&n&&s.isVector3&&n.isVector3||s&&n&&s.isMatrix3&&n.isMatrix3?s.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==vf)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case Fo:e.x=e.x-Math.floor(e.x);break;case di:e.x=e.x<0?0:1;break;case Oo:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case Fo:e.y=e.y-Math.floor(e.y);break;case di:e.y=e.y<0?0:1;break;case Oo:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}nn.DEFAULT_IMAGE=null;nn.DEFAULT_MAPPING=vf;nn.DEFAULT_ANISOTROPY=1;class Tt{constructor(e=0,t=0,n=0,s=1){Tt.prototype.isVector4=!0,this.x=e,this.y=t,this.z=n,this.w=s}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,s){return this.x=e,this.y=t,this.z=n,this.w=s,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,n=this.y,s=this.z,r=this.w,a=e.elements;return this.x=a[0]*t+a[4]*n+a[8]*s+a[12]*r,this.y=a[1]*t+a[5]*n+a[9]*s+a[13]*r,this.z=a[2]*t+a[6]*n+a[10]*s+a[14]*r,this.w=a[3]*t+a[7]*n+a[11]*s+a[15]*r,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,s,r;const l=e.elements,c=l[0],h=l[4],u=l[8],f=l[1],d=l[5],g=l[9],v=l[2],m=l[6],p=l[10];if(Math.abs(h-f)<.01&&Math.abs(u-v)<.01&&Math.abs(g-m)<.01){if(Math.abs(h+f)<.1&&Math.abs(u+v)<.1&&Math.abs(g+m)<.1&&Math.abs(c+d+p-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const w=(c+1)/2,M=(d+1)/2,D=(p+1)/2,R=(h+f)/4,L=(u+v)/4,x=(g+m)/4;return w>M&&w>D?w<.01?(n=0,s=.707106781,r=.707106781):(n=Math.sqrt(w),s=R/n,r=L/n):M>D?M<.01?(n=.707106781,s=0,r=.707106781):(s=Math.sqrt(M),n=R/s,r=x/s):D<.01?(n=.707106781,s=.707106781,r=0):(r=Math.sqrt(D),n=L/r,s=x/r),this.set(n,s,r,t),this}let y=Math.sqrt((m-g)*(m-g)+(u-v)*(u-v)+(f-h)*(f-h));return Math.abs(y)<.001&&(y=1),this.x=(m-g)/y,this.y=(u-v)/y,this.z=(f-h)/y,this.w=Math.acos((c+d+p-1)/2),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Ye(this.x,e.x,t.x),this.y=Ye(this.y,e.y,t.y),this.z=Ye(this.z,e.z,t.z),this.w=Ye(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=Ye(this.x,e,t),this.y=Ye(this.y,e,t),this.z=Ye(this.z,e,t),this.w=Ye(this.w,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Ye(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class Fd extends as{constructor(e=1,t=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:$t,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1},n),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=n.depth,this.scissor=new Tt(0,0,e,t),this.scissorTest=!1,this.viewport=new Tt(0,0,e,t),this.textures=[];const s={width:e,height:t,depth:n.depth},r=new nn(s),a=n.count;for(let o=0;o<a;o++)this.textures[o]=r.clone(),this.textures[o].isRenderTargetTexture=!0,this.textures[o].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview}_setTextureOptions(e={}){const t={minFilter:$t,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let n=0;n<this.textures.length;n++)this.textures[n].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),e!==null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=e,this.textures[s].image.height=t,this.textures[s].image.depth=n,this.textures[s].isData3DTexture!==!0&&(this.textures[s].isArrayTexture=this.textures[s].image.depth>1);this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,n=e.textures.length;t<n;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;const s=Object.assign({},e.textures[t].image);this.textures[t].source=new Xl(s)}return this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class jn extends Fd{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}}class Rf extends nn{constructor(e=null,t=1,n=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:s},this.magFilter=Zt,this.minFilter=Zt,this.wrapR=di,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class Od extends nn{constructor(e=null,t=1,n=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:s},this.magFilter=Zt,this.minFilter=Zt,this.wrapR=di,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class xt{constructor(e,t,n,s,r,a,o,l,c,h,u,f,d,g,v,m){xt.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,s,r,a,o,l,c,h,u,f,d,g,v,m)}set(e,t,n,s,r,a,o,l,c,h,u,f,d,g,v,m){const p=this.elements;return p[0]=e,p[4]=t,p[8]=n,p[12]=s,p[1]=r,p[5]=a,p[9]=o,p[13]=l,p[2]=c,p[6]=h,p[10]=u,p[14]=f,p[3]=d,p[7]=g,p[11]=v,p[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new xt().fromArray(this.elements)}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){const t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return this.determinant()===0?(e.set(1,0,0),t.set(0,1,0),n.set(0,0,1),this):(e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this)}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){if(e.determinant()===0)return this.identity();const t=this.elements,n=e.elements,s=1/us.setFromMatrixColumn(e,0).length(),r=1/us.setFromMatrixColumn(e,1).length(),a=1/us.setFromMatrixColumn(e,2).length();return t[0]=n[0]*s,t[1]=n[1]*s,t[2]=n[2]*s,t[3]=0,t[4]=n[4]*r,t[5]=n[5]*r,t[6]=n[6]*r,t[7]=0,t[8]=n[8]*a,t[9]=n[9]*a,t[10]=n[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,n=e.x,s=e.y,r=e.z,a=Math.cos(n),o=Math.sin(n),l=Math.cos(s),c=Math.sin(s),h=Math.cos(r),u=Math.sin(r);if(e.order==="XYZ"){const f=a*h,d=a*u,g=o*h,v=o*u;t[0]=l*h,t[4]=-l*u,t[8]=c,t[1]=d+g*c,t[5]=f-v*c,t[9]=-o*l,t[2]=v-f*c,t[6]=g+d*c,t[10]=a*l}else if(e.order==="YXZ"){const f=l*h,d=l*u,g=c*h,v=c*u;t[0]=f+v*o,t[4]=g*o-d,t[8]=a*c,t[1]=a*u,t[5]=a*h,t[9]=-o,t[2]=d*o-g,t[6]=v+f*o,t[10]=a*l}else if(e.order==="ZXY"){const f=l*h,d=l*u,g=c*h,v=c*u;t[0]=f-v*o,t[4]=-a*u,t[8]=g+d*o,t[1]=d+g*o,t[5]=a*h,t[9]=v-f*o,t[2]=-a*c,t[6]=o,t[10]=a*l}else if(e.order==="ZYX"){const f=a*h,d=a*u,g=o*h,v=o*u;t[0]=l*h,t[4]=g*c-d,t[8]=f*c+v,t[1]=l*u,t[5]=v*c+f,t[9]=d*c-g,t[2]=-c,t[6]=o*l,t[10]=a*l}else if(e.order==="YZX"){const f=a*l,d=a*c,g=o*l,v=o*c;t[0]=l*h,t[4]=v-f*u,t[8]=g*u+d,t[1]=u,t[5]=a*h,t[9]=-o*h,t[2]=-c*h,t[6]=d*u+g,t[10]=f-v*u}else if(e.order==="XZY"){const f=a*l,d=a*c,g=o*l,v=o*c;t[0]=l*h,t[4]=-u,t[8]=c*h,t[1]=f*u+v,t[5]=a*h,t[9]=d*u-g,t[2]=g*u-d,t[6]=o*h,t[10]=v*u+f}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(Bd,e,zd)}lookAt(e,t,n){const s=this.elements;return mn.subVectors(e,t),mn.lengthSq()===0&&(mn.z=1),mn.normalize(),Ei.crossVectors(n,mn),Ei.lengthSq()===0&&(Math.abs(n.z)===1?mn.x+=1e-4:mn.z+=1e-4,mn.normalize(),Ei.crossVectors(n,mn)),Ei.normalize(),Pr.crossVectors(mn,Ei),s[0]=Ei.x,s[4]=Pr.x,s[8]=mn.x,s[1]=Ei.y,s[5]=Pr.y,s[9]=mn.y,s[2]=Ei.z,s[6]=Pr.z,s[10]=mn.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,s=t.elements,r=this.elements,a=n[0],o=n[4],l=n[8],c=n[12],h=n[1],u=n[5],f=n[9],d=n[13],g=n[2],v=n[6],m=n[10],p=n[14],y=n[3],w=n[7],M=n[11],D=n[15],R=s[0],L=s[4],x=s[8],E=s[12],X=s[1],I=s[5],G=s[9],b=s[13],U=s[2],C=s[6],P=s[10],A=s[14],q=s[3],j=s[7],ee=s[11],se=s[15];return r[0]=a*R+o*X+l*U+c*q,r[4]=a*L+o*I+l*C+c*j,r[8]=a*x+o*G+l*P+c*ee,r[12]=a*E+o*b+l*A+c*se,r[1]=h*R+u*X+f*U+d*q,r[5]=h*L+u*I+f*C+d*j,r[9]=h*x+u*G+f*P+d*ee,r[13]=h*E+u*b+f*A+d*se,r[2]=g*R+v*X+m*U+p*q,r[6]=g*L+v*I+m*C+p*j,r[10]=g*x+v*G+m*P+p*ee,r[14]=g*E+v*b+m*A+p*se,r[3]=y*R+w*X+M*U+D*q,r[7]=y*L+w*I+M*C+D*j,r[11]=y*x+w*G+M*P+D*ee,r[15]=y*E+w*b+M*A+D*se,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[4],s=e[8],r=e[12],a=e[1],o=e[5],l=e[9],c=e[13],h=e[2],u=e[6],f=e[10],d=e[14],g=e[3],v=e[7],m=e[11],p=e[15],y=l*d-c*f,w=o*d-c*u,M=o*f-l*u,D=a*d-c*h,R=a*f-l*h,L=a*u-o*h;return t*(v*y-m*w+p*M)-n*(g*y-m*D+p*R)+s*(g*w-v*D+p*L)-r*(g*M-v*R+m*L)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){const s=this.elements;return e.isVector3?(s[12]=e.x,s[13]=e.y,s[14]=e.z):(s[12]=e,s[13]=t,s[14]=n),this}invert(){const e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],a=e[4],o=e[5],l=e[6],c=e[7],h=e[8],u=e[9],f=e[10],d=e[11],g=e[12],v=e[13],m=e[14],p=e[15],y=t*o-n*a,w=t*l-s*a,M=t*c-r*a,D=n*l-s*o,R=n*c-r*o,L=s*c-r*l,x=h*v-u*g,E=h*m-f*g,X=h*p-d*g,I=u*m-f*v,G=u*p-d*v,b=f*p-d*m,U=y*b-w*G+M*I+D*X-R*E+L*x;if(U===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const C=1/U;return e[0]=(o*b-l*G+c*I)*C,e[1]=(s*G-n*b-r*I)*C,e[2]=(v*L-m*R+p*D)*C,e[3]=(f*R-u*L-d*D)*C,e[4]=(l*X-a*b-c*E)*C,e[5]=(t*b-s*X+r*E)*C,e[6]=(m*M-g*L-p*w)*C,e[7]=(h*L-f*M+d*w)*C,e[8]=(a*G-o*X+c*x)*C,e[9]=(n*X-t*G-r*x)*C,e[10]=(g*R-v*M+p*y)*C,e[11]=(u*M-h*R-d*y)*C,e[12]=(o*E-a*I-l*x)*C,e[13]=(t*I-n*E+s*x)*C,e[14]=(v*w-g*D-m*y)*C,e[15]=(h*D-u*w+f*y)*C,this}scale(e){const t=this.elements,n=e.x,s=e.y,r=e.z;return t[0]*=n,t[4]*=s,t[8]*=r,t[1]*=n,t[5]*=s,t[9]*=r,t[2]*=n,t[6]*=s,t[10]*=r,t[3]*=n,t[7]*=s,t[11]*=r,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],s=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,s))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const n=Math.cos(t),s=Math.sin(t),r=1-n,a=e.x,o=e.y,l=e.z,c=r*a,h=r*o;return this.set(c*a+n,c*o-s*l,c*l+s*o,0,c*o+s*l,h*o+n,h*l-s*a,0,c*l-s*o,h*l+s*a,r*l*l+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,s,r,a){return this.set(1,n,r,0,e,1,a,0,t,s,1,0,0,0,0,1),this}compose(e,t,n){const s=this.elements,r=t._x,a=t._y,o=t._z,l=t._w,c=r+r,h=a+a,u=o+o,f=r*c,d=r*h,g=r*u,v=a*h,m=a*u,p=o*u,y=l*c,w=l*h,M=l*u,D=n.x,R=n.y,L=n.z;return s[0]=(1-(v+p))*D,s[1]=(d+M)*D,s[2]=(g-w)*D,s[3]=0,s[4]=(d-M)*R,s[5]=(1-(f+p))*R,s[6]=(m+y)*R,s[7]=0,s[8]=(g+w)*L,s[9]=(m-y)*L,s[10]=(1-(f+v))*L,s[11]=0,s[12]=e.x,s[13]=e.y,s[14]=e.z,s[15]=1,this}decompose(e,t,n){const s=this.elements;e.x=s[12],e.y=s[13],e.z=s[14];const r=this.determinant();if(r===0)return n.set(1,1,1),t.identity(),this;let a=us.set(s[0],s[1],s[2]).length();const o=us.set(s[4],s[5],s[6]).length(),l=us.set(s[8],s[9],s[10]).length();r<0&&(a=-a),In.copy(this);const c=1/a,h=1/o,u=1/l;return In.elements[0]*=c,In.elements[1]*=c,In.elements[2]*=c,In.elements[4]*=h,In.elements[5]*=h,In.elements[6]*=h,In.elements[8]*=u,In.elements[9]*=u,In.elements[10]*=u,t.setFromRotationMatrix(In),n.x=a,n.y=o,n.z=l,this}makePerspective(e,t,n,s,r,a,o=Yn,l=!1){const c=this.elements,h=2*r/(t-e),u=2*r/(n-s),f=(t+e)/(t-e),d=(n+s)/(n-s);let g,v;if(l)g=r/(a-r),v=a*r/(a-r);else if(o===Yn)g=-(a+r)/(a-r),v=-2*a*r/(a-r);else if(o===gr)g=-a/(a-r),v=-a*r/(a-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return c[0]=h,c[4]=0,c[8]=f,c[12]=0,c[1]=0,c[5]=u,c[9]=d,c[13]=0,c[2]=0,c[6]=0,c[10]=g,c[14]=v,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,n,s,r,a,o=Yn,l=!1){const c=this.elements,h=2/(t-e),u=2/(n-s),f=-(t+e)/(t-e),d=-(n+s)/(n-s);let g,v;if(l)g=1/(a-r),v=a/(a-r);else if(o===Yn)g=-2/(a-r),v=-(a+r)/(a-r);else if(o===gr)g=-1/(a-r),v=-r/(a-r);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return c[0]=h,c[4]=0,c[8]=0,c[12]=f,c[1]=0,c[5]=u,c[9]=0,c[13]=d,c[2]=0,c[6]=0,c[10]=g,c[14]=v,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){const t=this.elements,n=e.elements;for(let s=0;s<16;s++)if(t[s]!==n[s])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}}const us=new O,In=new xt,Bd=new O(0,0,0),zd=new O(1,1,1),Ei=new O,Pr=new O,mn=new O,zc=new xt,kc=new Oi;class ei{constructor(e=0,t=0,n=0,s=ei.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=s}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,s=this._order){return this._x=e,this._y=t,this._z=n,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){const s=e.elements,r=s[0],a=s[4],o=s[8],l=s[1],c=s[5],h=s[9],u=s[2],f=s[6],d=s[10];switch(t){case"XYZ":this._y=Math.asin(Ye(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-h,d),this._z=Math.atan2(-a,r)):(this._x=Math.atan2(f,c),this._z=0);break;case"YXZ":this._x=Math.asin(-Ye(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(o,d),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-u,r),this._z=0);break;case"ZXY":this._x=Math.asin(Ye(f,-1,1)),Math.abs(f)<.9999999?(this._y=Math.atan2(-u,d),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(l,r));break;case"ZYX":this._y=Math.asin(-Ye(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(f,d),this._z=Math.atan2(l,r)):(this._x=0,this._z=Math.atan2(-a,c));break;case"YZX":this._z=Math.asin(Ye(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-h,c),this._y=Math.atan2(-u,r)):(this._x=0,this._y=Math.atan2(o,d));break;case"XZY":this._z=Math.asin(-Ye(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(f,c),this._y=Math.atan2(o,r)):(this._x=Math.atan2(-h,d),this._y=0);break;default:Fe("Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return zc.makeRotationFromQuaternion(e),this.setFromRotationMatrix(zc,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return kc.setFromEuler(this),this.setFromQuaternion(kc,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}ei.DEFAULT_ORDER="XYZ";class $l{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let kd=0;const Vc=new O,ds=new Oi,si=new xt,Dr=new O,Zs=new O,Vd=new O,Gd=new Oi,Gc=new O(1,0,0),Hc=new O(0,1,0),Wc=new O(0,0,1),Xc={type:"added"},Hd={type:"removed"},ps={type:"childadded",child:null},ja={type:"childremoved",child:null};class Ot extends as{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:kd++}),this.uuid=Li(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=Ot.DEFAULT_UP.clone();const e=new O,t=new ei,n=new Oi,s=new O(1,1,1);function r(){n.setFromEuler(t,!1)}function a(){t.setFromQuaternion(n,void 0,!1)}t._onChange(r),n._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new xt},normalMatrix:{value:new Ve}}),this.matrix=new xt,this.matrixWorld=new xt,this.matrixAutoUpdate=Ot.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=Ot.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new $l,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return ds.setFromAxisAngle(e,t),this.quaternion.multiply(ds),this}rotateOnWorldAxis(e,t){return ds.setFromAxisAngle(e,t),this.quaternion.premultiply(ds),this}rotateX(e){return this.rotateOnAxis(Gc,e)}rotateY(e){return this.rotateOnAxis(Hc,e)}rotateZ(e){return this.rotateOnAxis(Wc,e)}translateOnAxis(e,t){return Vc.copy(e).applyQuaternion(this.quaternion),this.position.add(Vc.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(Gc,e)}translateY(e){return this.translateOnAxis(Hc,e)}translateZ(e){return this.translateOnAxis(Wc,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(si.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?Dr.copy(e):Dr.set(e,t,n);const s=this.parent;this.updateWorldMatrix(!0,!1),Zs.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?si.lookAt(Zs,Dr,this.up):si.lookAt(Dr,Zs,this.up),this.quaternion.setFromRotationMatrix(si),s&&(si.extractRotation(s.matrixWorld),ds.setFromRotationMatrix(si),this.quaternion.premultiply(ds.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(Je("Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(Xc),ps.child=e,this.dispatchEvent(ps),ps.child=null):Je("Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(Hd),ja.child=e,this.dispatchEvent(ja),ja.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),si.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),si.multiply(e.parent.matrixWorld)),e.applyMatrix4(si),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(Xc),ps.child=e,this.dispatchEvent(ps),ps.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,s=this.children.length;n<s;n++){const a=this.children[n].getObjectByProperty(e,t);if(a!==void 0)return a}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);const s=this.children;for(let r=0,a=s.length;r<a;r++)s[r].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Zs,e,Vd),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Zs,Gd,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);const e=this.pivot;if(e!==null){const t=e.x,n=e.y,s=e.z,r=this.matrix.elements;r[12]+=t-r[0]*t-r[4]*n-r[8]*s,r[13]+=n-r[1]*t-r[5]*n-r[9]*s,r[14]+=s-r[2]*t-r[6]*n-r[10]*s}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t){const n=this.parent;if(e===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),t===!0){const s=this.children;for(let r=0,a=s.length;r<a;r++)s[r].updateWorldMatrix(!1,!0)}}toJSON(e){const t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),this.static!==!1&&(s.static=this.static),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.pivot!==null&&(s.pivot=this.pivot.toArray()),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.morphTargetDictionary!==void 0&&(s.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(s.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),s.instanceInfo=this._instanceInfo.map(o=>({...o})),s.availableInstanceIds=this._availableInstanceIds.slice(),s.availableGeometryIds=this._availableGeometryIds.slice(),s.nextIndexStart=this._nextIndexStart,s.nextVertexStart=this._nextVertexStart,s.geometryCount=this._geometryCount,s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.matricesTexture=this._matricesTexture.toJSON(e),s.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(s.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(s.boundingBox=this.boundingBox.toJSON()));function r(o,l){return o[l.uuid]===void 0&&(o[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(e.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const l=o.shapes;if(Array.isArray(l))for(let c=0,h=l.length;c<h;c++){const u=l[c];r(e.shapes,u)}else r(e.shapes,l)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(e.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let l=0,c=this.material.length;l<c;l++)o.push(r(e.materials,this.material[l]));s.material=o}else s.material=r(e.materials,this.material);if(this.children.length>0){s.children=[];for(let o=0;o<this.children.length;o++)s.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){s.animations=[];for(let o=0;o<this.animations.length;o++){const l=this.animations[o];s.animations.push(r(e.animations,l))}}if(t){const o=a(e.geometries),l=a(e.materials),c=a(e.textures),h=a(e.images),u=a(e.shapes),f=a(e.skeletons),d=a(e.animations),g=a(e.nodes);o.length>0&&(n.geometries=o),l.length>0&&(n.materials=l),c.length>0&&(n.textures=c),h.length>0&&(n.images=h),u.length>0&&(n.shapes=u),f.length>0&&(n.skeletons=f),d.length>0&&(n.animations=d),g.length>0&&(n.nodes=g)}return n.object=s,n;function a(o){const l=[];for(const c in o){const h=o[c];delete h.metadata,l.push(h)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),e.pivot!==null&&(this.pivot=e.pivot.clone()),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.static=e.static,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){const s=e.children[n];this.add(s.clone())}return this}}Ot.DEFAULT_UP=new O(0,1,0);Ot.DEFAULT_MATRIX_AUTO_UPDATE=!0;Ot.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;class Nn extends Ot{constructor(){super(),this.isGroup=!0,this.type="Group"}}const Wd={type:"move"};class Za{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Nn,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Nn,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new O,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new O),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Nn,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new O,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new O),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let s=null,r=null,a=null;const o=this._targetRay,l=this._grip,c=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(c&&e.hand){a=!0;for(const v of e.hand.values()){const m=t.getJointPose(v,n),p=this._getHandJoint(c,v);m!==null&&(p.matrix.fromArray(m.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=m.radius),p.visible=m!==null}const h=c.joints["index-finger-tip"],u=c.joints["thumb-tip"],f=h.position.distanceTo(u.position),d=.02,g=.005;c.inputState.pinching&&f>d+g?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&f<=d-g&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(r=t.getPose(e.gripSpace,n),r!==null&&(l.matrix.fromArray(r.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,r.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(r.linearVelocity)):l.hasLinearVelocity=!1,r.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(r.angularVelocity)):l.hasAngularVelocity=!1));o!==null&&(s=t.getPose(e.targetRaySpace,n),s===null&&r!==null&&(s=r),s!==null&&(o.matrix.fromArray(s.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,s.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(s.linearVelocity)):o.hasLinearVelocity=!1,s.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(s.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(Wd)))}return o!==null&&(o.visible=s!==null),l!==null&&(l.visible=r!==null),c!==null&&(c.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const n=new Nn;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}}const Pf={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},bi={h:0,s:0,l:0},Ir={h:0,s:0,l:0};function Ka(i,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?i+(e-i)*6*t:t<1/2?e:t<2/3?i+(e-i)*6*(2/3-t):i}class He{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){const s=e;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=Tn){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,et.colorSpaceToWorking(this,t),this}setRGB(e,t,n,s=et.workingColorSpace){return this.r=e,this.g=t,this.b=n,et.colorSpaceToWorking(this,s),this}setHSL(e,t,n,s=et.workingColorSpace){if(e=Pd(e,1),t=Ye(t,0,1),n=Ye(n,0,1),t===0)this.r=this.g=this.b=n;else{const r=n<=.5?n*(1+t):n+t-n*t,a=2*n-r;this.r=Ka(a,r,e+1/3),this.g=Ka(a,r,e),this.b=Ka(a,r,e-1/3)}return et.colorSpaceToWorking(this,s),this}setStyle(e,t=Tn){function n(r){r!==void 0&&parseFloat(r)<1&&Fe("Color: Alpha component of "+e+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(e)){let r;const a=s[1],o=s[2];switch(a){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,t);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,t);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,t);break;default:Fe("Color: Unknown color model "+e)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(e)){const r=s[1],a=r.length;if(a===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,t);if(a===6)return this.setHex(parseInt(r,16),t);Fe("Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=Tn){const n=Pf[e.toLowerCase()];return n!==void 0?this.setHex(n,t):Fe("Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=mi(e.r),this.g=mi(e.g),this.b=mi(e.b),this}copyLinearToSRGB(e){return this.r=Ns(e.r),this.g=Ns(e.g),this.b=Ns(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=Tn){return et.workingToColorSpace(Qt.copy(this),e),Math.round(Ye(Qt.r*255,0,255))*65536+Math.round(Ye(Qt.g*255,0,255))*256+Math.round(Ye(Qt.b*255,0,255))}getHexString(e=Tn){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=et.workingColorSpace){et.workingToColorSpace(Qt.copy(this),t);const n=Qt.r,s=Qt.g,r=Qt.b,a=Math.max(n,s,r),o=Math.min(n,s,r);let l,c;const h=(o+a)/2;if(o===a)l=0,c=0;else{const u=a-o;switch(c=h<=.5?u/(a+o):u/(2-a-o),a){case n:l=(s-r)/u+(s<r?6:0);break;case s:l=(r-n)/u+2;break;case r:l=(n-s)/u+4;break}l/=6}return e.h=l,e.s=c,e.l=h,e}getRGB(e,t=et.workingColorSpace){return et.workingToColorSpace(Qt.copy(this),t),e.r=Qt.r,e.g=Qt.g,e.b=Qt.b,e}getStyle(e=Tn){et.workingToColorSpace(Qt.copy(this),e);const t=Qt.r,n=Qt.g,s=Qt.b;return e!==Tn?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(s*255)})`}offsetHSL(e,t,n){return this.getHSL(bi),this.setHSL(bi.h+e,bi.s+t,bi.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(bi),e.getHSL(Ir);const n=Wa(bi.h,Ir.h,t),s=Wa(bi.s,Ir.s,t),r=Wa(bi.l,Ir.l,t);return this.setHSL(n,s,r),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,n=this.g,s=this.b,r=e.elements;return this.r=r[0]*t+r[3]*n+r[6]*s,this.g=r[1]*t+r[4]*n+r[7]*s,this.b=r[2]*t+r[5]*n+r[8]*s,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Qt=new He;He.NAMES=Pf;class Yl{constructor(e,t=25e-5){this.isFogExp2=!0,this.name="",this.color=new He(e),this.density=t}clone(){return new Yl(this.color,this.density)}toJSON(){return{type:"FogExp2",name:this.name,color:this.color.getHex(),density:this.density}}}class Df extends Ot{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new ei,this.environmentIntensity=1,this.environmentRotation=new ei,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}}const Ln=new O,ri=new O,Ja=new O,ai=new O,ms=new O,gs=new O,$c=new O,Qa=new O,eo=new O,to=new O,no=new Tt,io=new Tt,so=new Tt;class Rn{constructor(e=new O,t=new O,n=new O){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,s){s.subVectors(n,t),Ln.subVectors(e,t),s.cross(Ln);const r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(e,t,n,s,r){Ln.subVectors(s,t),ri.subVectors(n,t),Ja.subVectors(e,t);const a=Ln.dot(Ln),o=Ln.dot(ri),l=Ln.dot(Ja),c=ri.dot(ri),h=ri.dot(Ja),u=a*c-o*o;if(u===0)return r.set(0,0,0),null;const f=1/u,d=(c*l-o*h)*f,g=(a*h-o*l)*f;return r.set(1-d-g,g,d)}static containsPoint(e,t,n,s){return this.getBarycoord(e,t,n,s,ai)===null?!1:ai.x>=0&&ai.y>=0&&ai.x+ai.y<=1}static getInterpolation(e,t,n,s,r,a,o,l){return this.getBarycoord(e,t,n,s,ai)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(r,ai.x),l.addScaledVector(a,ai.y),l.addScaledVector(o,ai.z),l)}static getInterpolatedAttribute(e,t,n,s,r,a){return no.setScalar(0),io.setScalar(0),so.setScalar(0),no.fromBufferAttribute(e,t),io.fromBufferAttribute(e,n),so.fromBufferAttribute(e,s),a.setScalar(0),a.addScaledVector(no,r.x),a.addScaledVector(io,r.y),a.addScaledVector(so,r.z),a}static isFrontFacing(e,t,n,s){return Ln.subVectors(n,t),ri.subVectors(e,t),Ln.cross(ri).dot(s)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,s){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[s]),this}setFromAttributeAndIndices(e,t,n,s){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,s),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Ln.subVectors(this.c,this.b),ri.subVectors(this.a,this.b),Ln.cross(ri).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return Rn.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return Rn.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,n,s,r){return Rn.getInterpolation(e,this.a,this.b,this.c,t,n,s,r)}containsPoint(e){return Rn.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return Rn.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const n=this.a,s=this.b,r=this.c;let a,o;ms.subVectors(s,n),gs.subVectors(r,n),Qa.subVectors(e,n);const l=ms.dot(Qa),c=gs.dot(Qa);if(l<=0&&c<=0)return t.copy(n);eo.subVectors(e,s);const h=ms.dot(eo),u=gs.dot(eo);if(h>=0&&u<=h)return t.copy(s);const f=l*u-h*c;if(f<=0&&l>=0&&h<=0)return a=l/(l-h),t.copy(n).addScaledVector(ms,a);to.subVectors(e,r);const d=ms.dot(to),g=gs.dot(to);if(g>=0&&d<=g)return t.copy(r);const v=d*c-l*g;if(v<=0&&c>=0&&g<=0)return o=c/(c-g),t.copy(n).addScaledVector(gs,o);const m=h*g-d*u;if(m<=0&&u-h>=0&&d-g>=0)return $c.subVectors(r,s),o=(u-h)/(u-h+(d-g)),t.copy(s).addScaledVector($c,o);const p=1/(m+v+f);return a=v*p,o=f*p,t.copy(n).addScaledVector(ms,a).addScaledVector(gs,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}class vr{constructor(e=new O(1/0,1/0,1/0),t=new O(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(Un.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(Un.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const n=Un.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const n=e.geometry;if(n!==void 0){const r=n.getAttribute("position");if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0)for(let a=0,o=r.count;a<o;a++)e.isMesh===!0?e.getVertexPosition(a,Un):Un.fromBufferAttribute(r,a),Un.applyMatrix4(e.matrixWorld),this.expandByPoint(Un);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),Lr.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),Lr.copy(n.boundingBox)),Lr.applyMatrix4(e.matrixWorld),this.union(Lr)}const s=e.children;for(let r=0,a=s.length;r<a;r++)this.expandByObject(s[r],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,Un),Un.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Ks),Ur.subVectors(this.max,Ks),_s.subVectors(e.a,Ks),xs.subVectors(e.b,Ks),vs.subVectors(e.c,Ks),wi.subVectors(xs,_s),Ti.subVectors(vs,xs),Gi.subVectors(_s,vs);let t=[0,-wi.z,wi.y,0,-Ti.z,Ti.y,0,-Gi.z,Gi.y,wi.z,0,-wi.x,Ti.z,0,-Ti.x,Gi.z,0,-Gi.x,-wi.y,wi.x,0,-Ti.y,Ti.x,0,-Gi.y,Gi.x,0];return!ro(t,_s,xs,vs,Ur)||(t=[1,0,0,0,1,0,0,0,1],!ro(t,_s,xs,vs,Ur))?!1:(Nr.crossVectors(wi,Ti),t=[Nr.x,Nr.y,Nr.z],ro(t,_s,xs,vs,Ur))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Un).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(Un).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(oi[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),oi[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),oi[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),oi[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),oi[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),oi[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),oi[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),oi[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(oi),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}}const oi=[new O,new O,new O,new O,new O,new O,new O,new O],Un=new O,Lr=new vr,_s=new O,xs=new O,vs=new O,wi=new O,Ti=new O,Gi=new O,Ks=new O,Ur=new O,Nr=new O,Hi=new O;function ro(i,e,t,n,s){for(let r=0,a=i.length-3;r<=a;r+=3){Hi.fromArray(i,r);const o=s.x*Math.abs(Hi.x)+s.y*Math.abs(Hi.y)+s.z*Math.abs(Hi.z),l=e.dot(Hi),c=t.dot(Hi),h=n.dot(Hi);if(Math.max(-Math.max(l,c,h),Math.min(l,c,h))>o)return!1}return!0}const Nt=new O,Fr=new Le;let Xd=0;class Sn{constructor(e,t,n=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:Xd++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=gl,this.updateRanges=[],this.gpuType=$n,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[e+s]=t.array[n+s];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)Fr.fromBufferAttribute(this,t),Fr.applyMatrix3(e),this.setXY(t,Fr.x,Fr.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)Nt.fromBufferAttribute(this,t),Nt.applyMatrix3(e),this.setXYZ(t,Nt.x,Nt.y,Nt.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)Nt.fromBufferAttribute(this,t),Nt.applyMatrix4(e),this.setXYZ(t,Nt.x,Nt.y,Nt.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)Nt.fromBufferAttribute(this,t),Nt.applyNormalMatrix(e),this.setXYZ(t,Nt.x,Nt.y,Nt.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)Nt.fromBufferAttribute(this,t),Nt.transformDirection(e),this.setXYZ(t,Nt.x,Nt.y,Nt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=Wn(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=ct(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=Wn(t,this.array)),t}setX(e,t){return this.normalized&&(t=ct(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=Wn(t,this.array)),t}setY(e,t){return this.normalized&&(t=ct(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=Wn(t,this.array)),t}setZ(e,t){return this.normalized&&(t=ct(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=Wn(t,this.array)),t}setW(e,t){return this.normalized&&(t=ct(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=ct(t,this.array),n=ct(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,s){return e*=this.itemSize,this.normalized&&(t=ct(t,this.array),n=ct(n,this.array),s=ct(s,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=s,this}setXYZW(e,t,n,s,r){return e*=this.itemSize,this.normalized&&(t=ct(t,this.array),n=ct(n,this.array),s=ct(s,this.array),r=ct(r,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=s,this.array[e+3]=r,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==gl&&(e.usage=this.usage),e}}class If extends Sn{constructor(e,t,n){super(new Uint16Array(e),t,n)}}class Lf extends Sn{constructor(e,t,n){super(new Uint32Array(e),t,n)}}class Lt extends Sn{constructor(e,t,n){super(new Float32Array(e),t,n)}}const $d=new vr,Js=new O,ao=new O;class yr{constructor(e=new O,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const n=this.center;t!==void 0?n.copy(t):$d.setFromPoints(e).getCenter(n);let s=0;for(let r=0,a=e.length;r<a;r++)s=Math.max(s,n.distanceToSquared(e[r]));return this.radius=Math.sqrt(s),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Js.subVectors(e,this.center);const t=Js.lengthSq();if(t>this.radius*this.radius){const n=Math.sqrt(t),s=(n-this.radius)*.5;this.center.addScaledVector(Js,s/n),this.radius+=s}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(ao.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Js.copy(e.center).add(ao)),this.expandByPoint(Js.copy(e.center).sub(ao))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}}let Yd=0;const En=new xt,oo=new Ot,ys=new O,gn=new vr,Qs=new vr,Gt=new O;class Yt extends as{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Yd++}),this.uuid=Li(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(Td(e)?Lf:If)(e,1):this.index=e,this}setIndirect(e,t=0){return this.indirect=e,this.indirectOffset=t,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const r=new Ve().getNormalMatrix(e);n.applyNormalMatrix(r),n.needsUpdate=!0}const s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(e),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return En.makeRotationFromQuaternion(e),this.applyMatrix4(En),this}rotateX(e){return En.makeRotationX(e),this.applyMatrix4(En),this}rotateY(e){return En.makeRotationY(e),this.applyMatrix4(En),this}rotateZ(e){return En.makeRotationZ(e),this.applyMatrix4(En),this}translate(e,t,n){return En.makeTranslation(e,t,n),this.applyMatrix4(En),this}scale(e,t,n){return En.makeScale(e,t,n),this.applyMatrix4(En),this}lookAt(e){return oo.lookAt(e),oo.updateMatrix(),this.applyMatrix4(oo.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(ys).negate(),this.translate(ys.x,ys.y,ys.z),this}setFromPoints(e){const t=this.getAttribute("position");if(t===void 0){const n=[];for(let s=0,r=e.length;s<r;s++){const a=e[s];n.push(a.x,a.y,a.z||0)}this.setAttribute("position",new Lt(n,3))}else{const n=Math.min(e.length,t.count);for(let s=0;s<n;s++){const r=e[s];t.setXYZ(s,r.x,r.y,r.z||0)}e.length>t.count&&Fe("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new vr);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){Je("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new O(-1/0,-1/0,-1/0),new O(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,s=t.length;n<s;n++){const r=t[n];gn.setFromBufferAttribute(r),this.morphTargetsRelative?(Gt.addVectors(this.boundingBox.min,gn.min),this.boundingBox.expandByPoint(Gt),Gt.addVectors(this.boundingBox.max,gn.max),this.boundingBox.expandByPoint(Gt)):(this.boundingBox.expandByPoint(gn.min),this.boundingBox.expandByPoint(gn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&Je('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new yr);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){Je("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new O,1/0);return}if(e){const n=this.boundingSphere.center;if(gn.setFromBufferAttribute(e),t)for(let r=0,a=t.length;r<a;r++){const o=t[r];Qs.setFromBufferAttribute(o),this.morphTargetsRelative?(Gt.addVectors(gn.min,Qs.min),gn.expandByPoint(Gt),Gt.addVectors(gn.max,Qs.max),gn.expandByPoint(Gt)):(gn.expandByPoint(Qs.min),gn.expandByPoint(Qs.max))}gn.getCenter(n);let s=0;for(let r=0,a=e.count;r<a;r++)Gt.fromBufferAttribute(e,r),s=Math.max(s,n.distanceToSquared(Gt));if(t)for(let r=0,a=t.length;r<a;r++){const o=t[r],l=this.morphTargetsRelative;for(let c=0,h=o.count;c<h;c++)Gt.fromBufferAttribute(o,c),l&&(ys.fromBufferAttribute(e,c),Gt.add(ys)),s=Math.max(s,n.distanceToSquared(Gt))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&Je('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){Je("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=t.position,s=t.normal,r=t.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Sn(new Float32Array(4*n.count),4));const a=this.getAttribute("tangent"),o=[],l=[];for(let x=0;x<n.count;x++)o[x]=new O,l[x]=new O;const c=new O,h=new O,u=new O,f=new Le,d=new Le,g=new Le,v=new O,m=new O;function p(x,E,X){c.fromBufferAttribute(n,x),h.fromBufferAttribute(n,E),u.fromBufferAttribute(n,X),f.fromBufferAttribute(r,x),d.fromBufferAttribute(r,E),g.fromBufferAttribute(r,X),h.sub(c),u.sub(c),d.sub(f),g.sub(f);const I=1/(d.x*g.y-g.x*d.y);isFinite(I)&&(v.copy(h).multiplyScalar(g.y).addScaledVector(u,-d.y).multiplyScalar(I),m.copy(u).multiplyScalar(d.x).addScaledVector(h,-g.x).multiplyScalar(I),o[x].add(v),o[E].add(v),o[X].add(v),l[x].add(m),l[E].add(m),l[X].add(m))}let y=this.groups;y.length===0&&(y=[{start:0,count:e.count}]);for(let x=0,E=y.length;x<E;++x){const X=y[x],I=X.start,G=X.count;for(let b=I,U=I+G;b<U;b+=3)p(e.getX(b+0),e.getX(b+1),e.getX(b+2))}const w=new O,M=new O,D=new O,R=new O;function L(x){D.fromBufferAttribute(s,x),R.copy(D);const E=o[x];w.copy(E),w.sub(D.multiplyScalar(D.dot(E))).normalize(),M.crossVectors(R,E);const I=M.dot(l[x])<0?-1:1;a.setXYZW(x,w.x,w.y,w.z,I)}for(let x=0,E=y.length;x<E;++x){const X=y[x],I=X.start,G=X.count;for(let b=I,U=I+G;b<U;b+=3)L(e.getX(b+0)),L(e.getX(b+1)),L(e.getX(b+2))}}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new Sn(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let f=0,d=n.count;f<d;f++)n.setXYZ(f,0,0,0);const s=new O,r=new O,a=new O,o=new O,l=new O,c=new O,h=new O,u=new O;if(e)for(let f=0,d=e.count;f<d;f+=3){const g=e.getX(f+0),v=e.getX(f+1),m=e.getX(f+2);s.fromBufferAttribute(t,g),r.fromBufferAttribute(t,v),a.fromBufferAttribute(t,m),h.subVectors(a,r),u.subVectors(s,r),h.cross(u),o.fromBufferAttribute(n,g),l.fromBufferAttribute(n,v),c.fromBufferAttribute(n,m),o.add(h),l.add(h),c.add(h),n.setXYZ(g,o.x,o.y,o.z),n.setXYZ(v,l.x,l.y,l.z),n.setXYZ(m,c.x,c.y,c.z)}else for(let f=0,d=t.count;f<d;f+=3)s.fromBufferAttribute(t,f+0),r.fromBufferAttribute(t,f+1),a.fromBufferAttribute(t,f+2),h.subVectors(a,r),u.subVectors(s,r),h.cross(u),n.setXYZ(f+0,h.x,h.y,h.z),n.setXYZ(f+1,h.x,h.y,h.z),n.setXYZ(f+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)Gt.fromBufferAttribute(e,t),Gt.normalize(),e.setXYZ(t,Gt.x,Gt.y,Gt.z)}toNonIndexed(){function e(o,l){const c=o.array,h=o.itemSize,u=o.normalized,f=new c.constructor(l.length*h);let d=0,g=0;for(let v=0,m=l.length;v<m;v++){o.isInterleavedBufferAttribute?d=l[v]*o.data.stride+o.offset:d=l[v]*h;for(let p=0;p<h;p++)f[g++]=c[d++]}return new Sn(f,h,u)}if(this.index===null)return Fe("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new Yt,n=this.index.array,s=this.attributes;for(const o in s){const l=s[o],c=e(l,n);t.setAttribute(o,c)}const r=this.morphAttributes;for(const o in r){const l=[],c=r[o];for(let h=0,u=c.length;h<u;h++){const f=c[h],d=e(f,n);l.push(d)}t.morphAttributes[o]=l}t.morphTargetsRelative=this.morphTargetsRelative;const a=this.groups;for(let o=0,l=a.length;o<l;o++){const c=a[o];t.addGroup(c.start,c.count,c.materialIndex)}return t}toJSON(){const e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const n=this.attributes;for(const l in n){const c=n[l];e.data.attributes[l]=c.toJSON(e.data)}const s={};let r=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],h=[];for(let u=0,f=c.length;u<f;u++){const d=c[u];h.push(d.toJSON(e.data))}h.length>0&&(s[l]=h,r=!0)}r&&(e.data.morphAttributes=s,e.data.morphTargetsRelative=this.morphTargetsRelative);const a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));const o=this.boundingSphere;return o!==null&&(e.data.boundingSphere=o.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const n=e.index;n!==null&&this.setIndex(n.clone());const s=e.attributes;for(const c in s){const h=s[c];this.setAttribute(c,h.clone(t))}const r=e.morphAttributes;for(const c in r){const h=[],u=r[c];for(let f=0,d=u.length;f<d;f++)h.push(u[f].clone(t));this.morphAttributes[c]=h}this.morphTargetsRelative=e.morphTargetsRelative;const a=e.groups;for(let c=0,h=a.length;c<h;c++){const u=a[c];this.addGroup(u.start,u.count,u.materialIndex)}const o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());const l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}class qd{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e!==void 0?e.length/t:0,this.usage=gl,this.updateRanges=[],this.version=0,this.uuid=Li()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,n){e*=this.stride,n*=t.stride;for(let s=0,r=this.stride;s<r;s++)this.array[e+s]=t.array[n+s];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Li()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);const t=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(t,this.stride);return n.setUsage(this.usage),n}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){return e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Li()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}}const sn=new O;class Ma{constructor(e,t,n,s=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=t,this.offset=n,this.normalized=s}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,n=this.data.count;t<n;t++)sn.fromBufferAttribute(this,t),sn.applyMatrix4(e),this.setXYZ(t,sn.x,sn.y,sn.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)sn.fromBufferAttribute(this,t),sn.applyNormalMatrix(e),this.setXYZ(t,sn.x,sn.y,sn.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)sn.fromBufferAttribute(this,t),sn.transformDirection(e),this.setXYZ(t,sn.x,sn.y,sn.z);return this}getComponent(e,t){let n=this.array[e*this.data.stride+this.offset+t];return this.normalized&&(n=Wn(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=ct(n,this.array)),this.data.array[e*this.data.stride+this.offset+t]=n,this}setX(e,t){return this.normalized&&(t=ct(t,this.array)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=ct(t,this.array)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=ct(t,this.array)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=ct(t,this.array)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=Wn(t,this.array)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=Wn(t,this.array)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=Wn(t,this.array)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=Wn(t,this.array)),t}setXY(e,t,n){return e=e*this.data.stride+this.offset,this.normalized&&(t=ct(t,this.array),n=ct(n,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this}setXYZ(e,t,n,s){return e=e*this.data.stride+this.offset,this.normalized&&(t=ct(t,this.array),n=ct(n,this.array),s=ct(s,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=s,this}setXYZW(e,t,n,s,r){return e=e*this.data.stride+this.offset,this.normalized&&(t=ct(t,this.array),n=ct(n,this.array),s=ct(s,this.array),r=ct(r,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=s,this.data.array[e+3]=r,this}clone(e){if(e===void 0){ya("InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let n=0;n<this.count;n++){const s=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[s+r])}return new Sn(new this.array.constructor(t),this.itemSize,this.normalized)}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new Ma(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){ya("InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let n=0;n<this.count;n++){const s=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[s+r])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:t,normalized:this.normalized}}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}}let jd=0;class tn extends as{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:jd++}),this.uuid=Li(),this.name="",this.type="Material",this.blending=Us,this.side=Fi,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Ao,this.blendDst=Co,this.blendEquation=Ki,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new He(0,0,0),this.blendAlpha=0,this.depthFunc=Bs,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Lc,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=hs,this.stencilZFail=hs,this.stencilZPass=hs,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const n=e[t];if(n===void 0){Fe(`Material: parameter '${t}' has value of undefined.`);continue}const s=this[t];if(s===void 0){Fe(`Material: '${t}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(n):s&&s.isVector3&&n&&n.isVector3?s.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==Us&&(n.blending=this.blending),this.side!==Fi&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==Ao&&(n.blendSrc=this.blendSrc),this.blendDst!==Co&&(n.blendDst=this.blendDst),this.blendEquation!==Ki&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==Bs&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Lc&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==hs&&(n.stencilFail=this.stencilFail),this.stencilZFail!==hs&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==hs&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.allowOverride===!1&&(n.allowOverride=!1),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function s(r){const a=[];for(const o in r){const l=r[o];delete l.metadata,a.push(l)}return a}if(t){const r=s(e.textures),a=s(e.images);r.length>0&&(n.textures=r),a.length>0&&(n.images=a)}return n}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let n=null;if(t!==null){const s=t.length;n=new Array(s);for(let r=0;r!==s;++r)n[r]=t[r].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.allowOverride=e.allowOverride,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}class ui extends tn{constructor(e){super(),this.isSpriteMaterial=!0,this.type="SpriteMaterial",this.color=new He(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.rotation=e.rotation,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}let Ss;const er=new O,Ms=new O,Es=new O,bs=new Le,tr=new Le,Uf=new xt,Or=new O,nr=new O,Br=new O,Yc=new Le,lo=new Le,qc=new Le;class Nf extends Ot{constructor(e=new ui){if(super(),this.isSprite=!0,this.type="Sprite",Ss===void 0){Ss=new Yt;const t=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),n=new qd(t,5);Ss.setIndex([0,1,2,0,2,3]),Ss.setAttribute("position",new Ma(n,3,0,!1)),Ss.setAttribute("uv",new Ma(n,2,3,!1))}this.geometry=Ss,this.material=e,this.center=new Le(.5,.5),this.count=1}raycast(e,t){e.camera===null&&Je('Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),Ms.setFromMatrixScale(this.matrixWorld),Uf.copy(e.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(e.camera.matrixWorldInverse,this.matrixWorld),Es.setFromMatrixPosition(this.modelViewMatrix),e.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&Ms.multiplyScalar(-Es.z);const n=this.material.rotation;let s,r;n!==0&&(r=Math.cos(n),s=Math.sin(n));const a=this.center;zr(Or.set(-.5,-.5,0),Es,a,Ms,s,r),zr(nr.set(.5,-.5,0),Es,a,Ms,s,r),zr(Br.set(.5,.5,0),Es,a,Ms,s,r),Yc.set(0,0),lo.set(1,0),qc.set(1,1);let o=e.ray.intersectTriangle(Or,nr,Br,!1,er);if(o===null&&(zr(nr.set(-.5,.5,0),Es,a,Ms,s,r),lo.set(0,1),o=e.ray.intersectTriangle(Or,Br,nr,!1,er),o===null))return;const l=e.ray.origin.distanceTo(er);l<e.near||l>e.far||t.push({distance:l,point:er.clone(),uv:Rn.getInterpolation(er,Or,nr,Br,Yc,lo,qc,new Le),face:null,object:this})}copy(e,t){return super.copy(e,t),e.center!==void 0&&this.center.copy(e.center),this.material=e.material,this}}function zr(i,e,t,n,s,r){bs.subVectors(i,t).addScalar(.5).multiply(n),s!==void 0?(tr.x=r*bs.x-s*bs.y,tr.y=s*bs.x+r*bs.y):tr.copy(bs),i.copy(e),i.x+=tr.x,i.y+=tr.y,i.applyMatrix4(Uf)}const li=new O,co=new O,kr=new O,Ai=new O,ho=new O,Vr=new O,fo=new O;class Sr{constructor(e=new O,t=new O(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,li)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=li.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(li.copy(this.origin).addScaledVector(this.direction,t),li.distanceToSquared(e))}distanceSqToSegment(e,t,n,s){co.copy(e).add(t).multiplyScalar(.5),kr.copy(t).sub(e).normalize(),Ai.copy(this.origin).sub(co);const r=e.distanceTo(t)*.5,a=-this.direction.dot(kr),o=Ai.dot(this.direction),l=-Ai.dot(kr),c=Ai.lengthSq(),h=Math.abs(1-a*a);let u,f,d,g;if(h>0)if(u=a*l-o,f=a*o-l,g=r*h,u>=0)if(f>=-g)if(f<=g){const v=1/h;u*=v,f*=v,d=u*(u+a*f+2*o)+f*(a*u+f+2*l)+c}else f=r,u=Math.max(0,-(a*f+o)),d=-u*u+f*(f+2*l)+c;else f=-r,u=Math.max(0,-(a*f+o)),d=-u*u+f*(f+2*l)+c;else f<=-g?(u=Math.max(0,-(-a*r+o)),f=u>0?-r:Math.min(Math.max(-r,-l),r),d=-u*u+f*(f+2*l)+c):f<=g?(u=0,f=Math.min(Math.max(-r,-l),r),d=f*(f+2*l)+c):(u=Math.max(0,-(a*r+o)),f=u>0?r:Math.min(Math.max(-r,-l),r),d=-u*u+f*(f+2*l)+c);else f=a>0?-r:r,u=Math.max(0,-(a*f+o)),d=-u*u+f*(f+2*l)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,u),s&&s.copy(co).addScaledVector(kr,f),d}intersectSphere(e,t){li.subVectors(e.center,this.origin);const n=li.dot(this.direction),s=li.dot(li)-n*n,r=e.radius*e.radius;if(s>r)return null;const a=Math.sqrt(r-s),o=n-a,l=n+a;return l<0?null:o<0?this.at(l,t):this.at(o,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){const n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,s,r,a,o,l;const c=1/this.direction.x,h=1/this.direction.y,u=1/this.direction.z,f=this.origin;return c>=0?(n=(e.min.x-f.x)*c,s=(e.max.x-f.x)*c):(n=(e.max.x-f.x)*c,s=(e.min.x-f.x)*c),h>=0?(r=(e.min.y-f.y)*h,a=(e.max.y-f.y)*h):(r=(e.max.y-f.y)*h,a=(e.min.y-f.y)*h),n>a||r>s||((r>n||isNaN(n))&&(n=r),(a<s||isNaN(s))&&(s=a),u>=0?(o=(e.min.z-f.z)*u,l=(e.max.z-f.z)*u):(o=(e.max.z-f.z)*u,l=(e.min.z-f.z)*u),n>l||o>s)||((o>n||n!==n)&&(n=o),(l<s||s!==s)&&(s=l),s<0)?null:this.at(n>=0?n:s,t)}intersectsBox(e){return this.intersectBox(e,li)!==null}intersectTriangle(e,t,n,s,r){ho.subVectors(t,e),Vr.subVectors(n,e),fo.crossVectors(ho,Vr);let a=this.direction.dot(fo),o;if(a>0){if(s)return null;o=1}else if(a<0)o=-1,a=-a;else return null;Ai.subVectors(this.origin,e);const l=o*this.direction.dot(Vr.crossVectors(Ai,Vr));if(l<0)return null;const c=o*this.direction.dot(ho.cross(Ai));if(c<0||l+c>a)return null;const h=-o*Ai.dot(fo);return h<0?null:this.at(h/a,r)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class Fs extends tn{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new He(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new ei,this.combine=ff,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const jc=new xt,Wi=new Sr,Gr=new yr,Zc=new O,Hr=new O,Wr=new O,Xr=new O,uo=new O,$r=new O,Kc=new O,Yr=new O;class Ie extends Ot{constructor(e=new Yt,t=new Fs){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){const o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}getVertexPosition(e,t){const n=this.geometry,s=n.attributes.position,r=n.morphAttributes.position,a=n.morphTargetsRelative;t.fromBufferAttribute(s,e);const o=this.morphTargetInfluences;if(r&&o){$r.set(0,0,0);for(let l=0,c=r.length;l<c;l++){const h=o[l],u=r[l];h!==0&&(uo.fromBufferAttribute(u,e),a?$r.addScaledVector(uo,h):$r.addScaledVector(uo.sub(t),h))}t.add($r)}return t}raycast(e,t){const n=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),Gr.copy(n.boundingSphere),Gr.applyMatrix4(r),Wi.copy(e.ray).recast(e.near),!(Gr.containsPoint(Wi.origin)===!1&&(Wi.intersectSphere(Gr,Zc)===null||Wi.origin.distanceToSquared(Zc)>(e.far-e.near)**2))&&(jc.copy(r).invert(),Wi.copy(e.ray).applyMatrix4(jc),!(n.boundingBox!==null&&Wi.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,Wi)))}_computeIntersections(e,t,n){let s;const r=this.geometry,a=this.material,o=r.index,l=r.attributes.position,c=r.attributes.uv,h=r.attributes.uv1,u=r.attributes.normal,f=r.groups,d=r.drawRange;if(o!==null)if(Array.isArray(a))for(let g=0,v=f.length;g<v;g++){const m=f[g],p=a[m.materialIndex],y=Math.max(m.start,d.start),w=Math.min(o.count,Math.min(m.start+m.count,d.start+d.count));for(let M=y,D=w;M<D;M+=3){const R=o.getX(M),L=o.getX(M+1),x=o.getX(M+2);s=qr(this,p,e,n,c,h,u,R,L,x),s&&(s.faceIndex=Math.floor(M/3),s.face.materialIndex=m.materialIndex,t.push(s))}}else{const g=Math.max(0,d.start),v=Math.min(o.count,d.start+d.count);for(let m=g,p=v;m<p;m+=3){const y=o.getX(m),w=o.getX(m+1),M=o.getX(m+2);s=qr(this,a,e,n,c,h,u,y,w,M),s&&(s.faceIndex=Math.floor(m/3),t.push(s))}}else if(l!==void 0)if(Array.isArray(a))for(let g=0,v=f.length;g<v;g++){const m=f[g],p=a[m.materialIndex],y=Math.max(m.start,d.start),w=Math.min(l.count,Math.min(m.start+m.count,d.start+d.count));for(let M=y,D=w;M<D;M+=3){const R=M,L=M+1,x=M+2;s=qr(this,p,e,n,c,h,u,R,L,x),s&&(s.faceIndex=Math.floor(M/3),s.face.materialIndex=m.materialIndex,t.push(s))}}else{const g=Math.max(0,d.start),v=Math.min(l.count,d.start+d.count);for(let m=g,p=v;m<p;m+=3){const y=m,w=m+1,M=m+2;s=qr(this,a,e,n,c,h,u,y,w,M),s&&(s.faceIndex=Math.floor(m/3),t.push(s))}}}}function Zd(i,e,t,n,s,r,a,o){let l;if(e.side===un?l=n.intersectTriangle(a,r,s,!0,o):l=n.intersectTriangle(s,r,a,e.side===Fi,o),l===null)return null;Yr.copy(o),Yr.applyMatrix4(i.matrixWorld);const c=t.ray.origin.distanceTo(Yr);return c<t.near||c>t.far?null:{distance:c,point:Yr.clone(),object:i}}function qr(i,e,t,n,s,r,a,o,l,c){i.getVertexPosition(o,Hr),i.getVertexPosition(l,Wr),i.getVertexPosition(c,Xr);const h=Zd(i,e,t,n,Hr,Wr,Xr,Kc);if(h){const u=new O;Rn.getBarycoord(Kc,Hr,Wr,Xr,u),s&&(h.uv=Rn.getInterpolatedAttribute(s,o,l,c,u,new Le)),r&&(h.uv1=Rn.getInterpolatedAttribute(r,o,l,c,u,new Le)),a&&(h.normal=Rn.getInterpolatedAttribute(a,o,l,c,u,new O),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));const f={a:o,b:l,c,normal:new O,materialIndex:0};Rn.getNormal(Hr,Wr,Xr,f.normal),h.face=f,h.barycoord=u}return h}class Kd extends nn{constructor(e=null,t=1,n=1,s,r,a,o,l,c=Zt,h=Zt,u,f){super(null,a,o,l,c,h,s,r,u,f),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const po=new O,Jd=new O,Qd=new Ve;class fi{constructor(e=new O(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,s){return this.normal.set(e,t,n),this.constant=s,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){const s=po.subVectors(n,t).cross(Jd.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(s,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){const n=e.delta(po),s=this.normal.dot(n);if(s===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const r=-(e.start.dot(this.normal)+this.constant)/s;return r<0||r>1?null:t.copy(e.start).addScaledVector(n,r)}intersectsLine(e){const t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const n=t||Qd.getNormalMatrix(e),s=this.coplanarPoint(po).applyMatrix4(e),r=this.normal.applyMatrix3(n).normalize();return this.constant=-s.dot(r),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const Xi=new yr,ep=new Le(.5,.5),jr=new O;class ql{constructor(e=new fi,t=new fi,n=new fi,s=new fi,r=new fi,a=new fi){this.planes=[e,t,n,s,r,a]}set(e,t,n,s,r,a){const o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(n),o[3].copy(s),o[4].copy(r),o[5].copy(a),this}copy(e){const t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=Yn,n=!1){const s=this.planes,r=e.elements,a=r[0],o=r[1],l=r[2],c=r[3],h=r[4],u=r[5],f=r[6],d=r[7],g=r[8],v=r[9],m=r[10],p=r[11],y=r[12],w=r[13],M=r[14],D=r[15];if(s[0].setComponents(c-a,d-h,p-g,D-y).normalize(),s[1].setComponents(c+a,d+h,p+g,D+y).normalize(),s[2].setComponents(c+o,d+u,p+v,D+w).normalize(),s[3].setComponents(c-o,d-u,p-v,D-w).normalize(),n)s[4].setComponents(l,f,m,M).normalize(),s[5].setComponents(c-l,d-f,p-m,D-M).normalize();else if(s[4].setComponents(c-l,d-f,p-m,D-M).normalize(),t===Yn)s[5].setComponents(c+l,d+f,p+m,D+M).normalize();else if(t===gr)s[5].setComponents(l,f,m,M).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Xi.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),Xi.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Xi)}intersectsSprite(e){Xi.center.set(0,0,0);const t=ep.distanceTo(e.center);return Xi.radius=.7071067811865476+t,Xi.applyMatrix4(e.matrixWorld),this.intersectsSphere(Xi)}intersectsSphere(e){const t=this.planes,n=e.center,s=-e.radius;for(let r=0;r<6;r++)if(t[r].distanceToPoint(n)<s)return!1;return!0}intersectsBox(e){const t=this.planes;for(let n=0;n<6;n++){const s=t[n];if(jr.x=s.normal.x>0?e.max.x:e.min.x,jr.y=s.normal.y>0?e.max.y:e.min.y,jr.z=s.normal.z>0?e.max.z:e.min.z,s.distanceToPoint(jr)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class jl extends tn{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new He(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}}const Ea=new O,ba=new O,Jc=new xt,ir=new Sr,Zr=new yr,mo=new O,Qc=new O;class tp extends Ot{constructor(e=new Yt,t=new jl){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,n=[0];for(let s=1,r=t.count;s<r;s++)Ea.fromBufferAttribute(t,s-1),ba.fromBufferAttribute(t,s),n[s]=n[s-1],n[s]+=Ea.distanceTo(ba);e.setAttribute("lineDistance",new Lt(n,1))}else Fe("Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,t){const n=this.geometry,s=this.matrixWorld,r=e.params.Line.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Zr.copy(n.boundingSphere),Zr.applyMatrix4(s),Zr.radius+=r,e.ray.intersectsSphere(Zr)===!1)return;Jc.copy(s).invert(),ir.copy(e.ray).applyMatrix4(Jc);const o=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=this.isLineSegments?2:1,h=n.index,f=n.attributes.position;if(h!==null){const d=Math.max(0,a.start),g=Math.min(h.count,a.start+a.count);for(let v=d,m=g-1;v<m;v+=c){const p=h.getX(v),y=h.getX(v+1),w=Kr(this,e,ir,l,p,y,v);w&&t.push(w)}if(this.isLineLoop){const v=h.getX(g-1),m=h.getX(d),p=Kr(this,e,ir,l,v,m,g-1);p&&t.push(p)}}else{const d=Math.max(0,a.start),g=Math.min(f.count,a.start+a.count);for(let v=d,m=g-1;v<m;v+=c){const p=Kr(this,e,ir,l,v,v+1,v);p&&t.push(p)}if(this.isLineLoop){const v=Kr(this,e,ir,l,g-1,d,g-1);v&&t.push(v)}}}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){const o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}}function Kr(i,e,t,n,s,r,a){const o=i.geometry.attributes.position;if(Ea.fromBufferAttribute(o,s),ba.fromBufferAttribute(o,r),t.distanceSqToSegment(Ea,ba,mo,Qc)>n)return;mo.applyMatrix4(i.matrixWorld);const c=e.ray.origin.distanceTo(mo);if(!(c<e.near||c>e.far))return{distance:c,point:Qc.clone().applyMatrix4(i.matrixWorld),index:a,face:null,faceIndex:null,barycoord:null,object:i}}const eh=new O,th=new O;class Ff extends tp{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,n=[];for(let s=0,r=t.count;s<r;s+=2)eh.fromBufferAttribute(t,s),th.fromBufferAttribute(t,s+1),n[s]=s===0?0:n[s-1],n[s+1]=n[s]+eh.distanceTo(th);e.setAttribute("lineDistance",new Lt(n,1))}else Fe("LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class xl extends tn{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new He(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}const nh=new xt,vl=new Sr,Jr=new yr,Qr=new O;class ih extends Ot{constructor(e=new Yt,t=new xl){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}raycast(e,t){const n=this.geometry,s=this.matrixWorld,r=e.params.Points.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Jr.copy(n.boundingSphere),Jr.applyMatrix4(s),Jr.radius+=r,e.ray.intersectsSphere(Jr)===!1)return;nh.copy(s).invert(),vl.copy(e.ray).applyMatrix4(nh);const o=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=n.index,u=n.attributes.position;if(c!==null){const f=Math.max(0,a.start),d=Math.min(c.count,a.start+a.count);for(let g=f,v=d;g<v;g++){const m=c.getX(g);Qr.fromBufferAttribute(u,m),sh(Qr,m,l,s,e,t,this)}}else{const f=Math.max(0,a.start),d=Math.min(u.count,a.start+a.count);for(let g=f,v=d;g<v;g++)Qr.fromBufferAttribute(u,g),sh(Qr,g,l,s,e,t,this)}}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){const o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}}function sh(i,e,t,n,s,r,a){const o=vl.distanceSqToPoint(i);if(o<t){const l=new O;vl.closestPointToPoint(i,l),l.applyMatrix4(n);const c=s.ray.origin.distanceTo(l);if(c<s.near||c>s.far)return;r.push({distance:c,distanceToRay:Math.sqrt(o),point:l,index:e,face:null,faceIndex:null,barycoord:null,object:a})}}class Of extends nn{constructor(e=[],t=ts,n,s,r,a,o,l,c,h){super(e,t,n,s,r,a,o,l,c,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class yl extends nn{constructor(e,t,n,s,r,a,o,l,c){super(e,t,n,s,r,a,o,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}}class _r extends nn{constructor(e,t,n=Qn,s,r,a,o=Zt,l=Zt,c,h=xi,u=1){if(h!==xi&&h!==es)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const f={width:e,height:t,depth:u};super(f,s,r,a,o,l,h,n,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new Xl(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}class np extends _r{constructor(e,t=Qn,n=ts,s,r,a=Zt,o=Zt,l,c=xi){const h={width:e,height:e,depth:1},u=[h,h,h,h,h,h];super(e,e,t,n,s,r,a,o,l,c),this.image=u,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(e){this.image=e}}class Bf extends nn{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}}class Mt extends Yt{constructor(e=1,t=1,n=1,s=1,r=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:s,heightSegments:r,depthSegments:a};const o=this;s=Math.floor(s),r=Math.floor(r),a=Math.floor(a);const l=[],c=[],h=[],u=[];let f=0,d=0;g("z","y","x",-1,-1,n,t,e,a,r,0),g("z","y","x",1,-1,n,t,-e,a,r,1),g("x","z","y",1,1,e,n,t,s,a,2),g("x","z","y",1,-1,e,n,-t,s,a,3),g("x","y","z",1,-1,e,t,n,s,r,4),g("x","y","z",-1,-1,e,t,-n,s,r,5),this.setIndex(l),this.setAttribute("position",new Lt(c,3)),this.setAttribute("normal",new Lt(h,3)),this.setAttribute("uv",new Lt(u,2));function g(v,m,p,y,w,M,D,R,L,x,E){const X=M/L,I=D/x,G=M/2,b=D/2,U=R/2,C=L+1,P=x+1;let A=0,q=0;const j=new O;for(let ee=0;ee<P;ee++){const se=ee*I-b;for(let ie=0;ie<C;ie++){const Pe=ie*X-G;j[v]=Pe*y,j[m]=se*w,j[p]=U,c.push(j.x,j.y,j.z),j[v]=0,j[m]=0,j[p]=R>0?1:-1,h.push(j.x,j.y,j.z),u.push(ie/L),u.push(1-ee/x),A+=1}}for(let ee=0;ee<x;ee++)for(let se=0;se<L;se++){const ie=f+se+C*ee,Pe=f+se+C*(ee+1),qe=f+(se+1)+C*(ee+1),Ke=f+(se+1)+C*ee;l.push(ie,Pe,Ke),l.push(Pe,qe,Ke),q+=6}o.addGroup(d,q,E),d+=q,f+=A}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Mt(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}class on extends Yt{constructor(e=1,t=1,n=1,s=32,r=1,a=!1,o=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:n,radialSegments:s,heightSegments:r,openEnded:a,thetaStart:o,thetaLength:l};const c=this;s=Math.floor(s),r=Math.floor(r);const h=[],u=[],f=[],d=[];let g=0;const v=[],m=n/2;let p=0;y(),a===!1&&(e>0&&w(!0),t>0&&w(!1)),this.setIndex(h),this.setAttribute("position",new Lt(u,3)),this.setAttribute("normal",new Lt(f,3)),this.setAttribute("uv",new Lt(d,2));function y(){const M=new O,D=new O;let R=0;const L=(t-e)/n;for(let x=0;x<=r;x++){const E=[],X=x/r,I=X*(t-e)+e;for(let G=0;G<=s;G++){const b=G/s,U=b*l+o,C=Math.sin(U),P=Math.cos(U);D.x=I*C,D.y=-X*n+m,D.z=I*P,u.push(D.x,D.y,D.z),M.set(C,L,P).normalize(),f.push(M.x,M.y,M.z),d.push(b,1-X),E.push(g++)}v.push(E)}for(let x=0;x<s;x++)for(let E=0;E<r;E++){const X=v[E][x],I=v[E+1][x],G=v[E+1][x+1],b=v[E][x+1];(e>0||E!==0)&&(h.push(X,I,b),R+=3),(t>0||E!==r-1)&&(h.push(I,G,b),R+=3)}c.addGroup(p,R,0),p+=R}function w(M){const D=g,R=new Le,L=new O;let x=0;const E=M===!0?e:t,X=M===!0?1:-1;for(let G=1;G<=s;G++)u.push(0,m*X,0),f.push(0,X,0),d.push(.5,.5),g++;const I=g;for(let G=0;G<=s;G++){const U=G/s*l+o,C=Math.cos(U),P=Math.sin(U);L.x=E*P,L.y=m*X,L.z=E*C,u.push(L.x,L.y,L.z),f.push(0,X,0),R.x=C*.5+.5,R.y=P*.5*X+.5,d.push(R.x,R.y),g++}for(let G=0;G<s;G++){const b=D+G,U=I+G;M===!0?h.push(U,U+1,b):h.push(U+1,U,b),x+=3}c.addGroup(p,x,M===!0?1:2),p+=x}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new on(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class wa extends on{constructor(e=1,t=1,n=32,s=1,r=!1,a=0,o=Math.PI*2){super(0,e,t,n,s,r,a,o),this.type="ConeGeometry",this.parameters={radius:e,height:t,radialSegments:n,heightSegments:s,openEnded:r,thetaStart:a,thetaLength:o}}static fromJSON(e){return new wa(e.radius,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class Zl extends Yt{constructor(e=[],t=[],n=1,s=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:e,indices:t,radius:n,detail:s};const r=[],a=[];o(s),c(n),h(),this.setAttribute("position",new Lt(r,3)),this.setAttribute("normal",new Lt(r.slice(),3)),this.setAttribute("uv",new Lt(a,2)),s===0?this.computeVertexNormals():this.normalizeNormals();function o(y){const w=new O,M=new O,D=new O;for(let R=0;R<t.length;R+=3)d(t[R+0],w),d(t[R+1],M),d(t[R+2],D),l(w,M,D,y)}function l(y,w,M,D){const R=D+1,L=[];for(let x=0;x<=R;x++){L[x]=[];const E=y.clone().lerp(M,x/R),X=w.clone().lerp(M,x/R),I=R-x;for(let G=0;G<=I;G++)G===0&&x===R?L[x][G]=E:L[x][G]=E.clone().lerp(X,G/I)}for(let x=0;x<R;x++)for(let E=0;E<2*(R-x)-1;E++){const X=Math.floor(E/2);E%2===0?(f(L[x][X+1]),f(L[x+1][X]),f(L[x][X])):(f(L[x][X+1]),f(L[x+1][X+1]),f(L[x+1][X]))}}function c(y){const w=new O;for(let M=0;M<r.length;M+=3)w.x=r[M+0],w.y=r[M+1],w.z=r[M+2],w.normalize().multiplyScalar(y),r[M+0]=w.x,r[M+1]=w.y,r[M+2]=w.z}function h(){const y=new O;for(let w=0;w<r.length;w+=3){y.x=r[w+0],y.y=r[w+1],y.z=r[w+2];const M=m(y)/2/Math.PI+.5,D=p(y)/Math.PI+.5;a.push(M,1-D)}g(),u()}function u(){for(let y=0;y<a.length;y+=6){const w=a[y+0],M=a[y+2],D=a[y+4],R=Math.max(w,M,D),L=Math.min(w,M,D);R>.9&&L<.1&&(w<.2&&(a[y+0]+=1),M<.2&&(a[y+2]+=1),D<.2&&(a[y+4]+=1))}}function f(y){r.push(y.x,y.y,y.z)}function d(y,w){const M=y*3;w.x=e[M+0],w.y=e[M+1],w.z=e[M+2]}function g(){const y=new O,w=new O,M=new O,D=new O,R=new Le,L=new Le,x=new Le;for(let E=0,X=0;E<r.length;E+=9,X+=6){y.set(r[E+0],r[E+1],r[E+2]),w.set(r[E+3],r[E+4],r[E+5]),M.set(r[E+6],r[E+7],r[E+8]),R.set(a[X+0],a[X+1]),L.set(a[X+2],a[X+3]),x.set(a[X+4],a[X+5]),D.copy(y).add(w).add(M).divideScalar(3);const I=m(D);v(R,X+0,y,I),v(L,X+2,w,I),v(x,X+4,M,I)}}function v(y,w,M,D){D<0&&y.x===1&&(a[w]=y.x-1),M.x===0&&M.z===0&&(a[w]=D/2/Math.PI+.5)}function m(y){return Math.atan2(y.z,-y.x)}function p(y){return Math.atan2(-y.y,Math.sqrt(y.x*y.x+y.z*y.z))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Zl(e.vertices,e.indices,e.radius,e.detail)}}class Kl extends Zl{constructor(e=1,t=0){const n=(1+Math.sqrt(5))/2,s=[-1,n,0,1,n,0,-1,-n,0,1,-n,0,0,-1,n,0,1,n,0,-1,-n,0,1,-n,n,0,-1,n,0,1,-n,0,-1,-n,0,1],r=[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1];super(s,r,e,t),this.type="IcosahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new Kl(e.radius,e.detail)}}class An extends Yt{constructor(e=1,t=1,n=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:s};const r=e/2,a=t/2,o=Math.floor(n),l=Math.floor(s),c=o+1,h=l+1,u=e/o,f=t/l,d=[],g=[],v=[],m=[];for(let p=0;p<h;p++){const y=p*f-a;for(let w=0;w<c;w++){const M=w*u-r;g.push(M,-y,0),v.push(0,0,1),m.push(w/o),m.push(1-p/l)}}for(let p=0;p<l;p++)for(let y=0;y<o;y++){const w=y+c*p,M=y+c*(p+1),D=y+1+c*(p+1),R=y+1+c*p;d.push(w,M,R),d.push(M,D,R)}this.setIndex(d),this.setAttribute("position",new Lt(g,3)),this.setAttribute("normal",new Lt(v,3)),this.setAttribute("uv",new Lt(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new An(e.width,e.height,e.widthSegments,e.heightSegments)}}function Gs(i){const e={};for(const t in i){e[t]={};for(const n in i[t]){const s=i[t][n];s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)?s.isRenderTargetTexture?(Fe("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=s.clone():Array.isArray(s)?e[t][n]=s.slice():e[t][n]=s}}return e}function an(i){const e={};for(let t=0;t<i.length;t++){const n=Gs(i[t]);for(const s in n)e[s]=n[s]}return e}function ip(i){const e=[];for(let t=0;t<i.length;t++)e.push(i[t].clone());return e}function zf(i){const e=i.getRenderTarget();return e===null?i.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:et.workingColorSpace}const sp={clone:Gs,merge:an};var rp=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,ap=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class ti extends tn{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=rp,this.fragmentShader=ap,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=Gs(e.uniforms),this.uniformsGroups=ip(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this.defaultAttributeValues=Object.assign({},e.defaultAttributeValues),this.index0AttributeName=e.index0AttributeName,this.uniformsNeedUpdate=e.uniformsNeedUpdate,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const s in this.uniforms){const a=this.uniforms[s].value;a&&a.isTexture?t.uniforms[s]={type:"t",value:a.toJSON(e).uuid}:a&&a.isColor?t.uniforms[s]={type:"c",value:a.getHex()}:a&&a.isVector2?t.uniforms[s]={type:"v2",value:a.toArray()}:a&&a.isVector3?t.uniforms[s]={type:"v3",value:a.toArray()}:a&&a.isVector4?t.uniforms[s]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?t.uniforms[s]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?t.uniforms[s]={type:"m4",value:a.toArray()}:t.uniforms[s]={value:a}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const n={};for(const s in this.extensions)this.extensions[s]===!0&&(n[s]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}}class op extends ti{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}}class Pt extends tn{constructor(e){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new He(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new He(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Af,this.normalScale=new Le(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new ei,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class lp extends tn{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=xd,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class cp extends tn{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}class Jl extends Ot{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new He(e),this.intensity=t}dispose(){this.dispatchEvent({type:"dispose"})}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,t}}const go=new xt,rh=new O,ah=new O;class kf{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new Le(512,512),this.mapType=yn,this.map=null,this.mapPass=null,this.matrix=new xt,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new ql,this._frameExtents=new Le(1,1),this._viewportCount=1,this._viewports=[new Tt(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const t=this.camera,n=this.matrix;rh.setFromMatrixPosition(e.matrixWorld),t.position.copy(rh),ah.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(ah),t.updateMatrixWorld(),go.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(go,t.coordinateSystem,t.reversedDepth),t.coordinateSystem===gr||t.reversedDepth?n.set(.5,0,0,.5,0,.5,0,.5,0,0,1,0,0,0,0,1):n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(go)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this.biasNode=e.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}const ea=new O,ta=new Oi,zn=new O;class Vf extends Ot{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new xt,this.projectionMatrix=new xt,this.projectionMatrixInverse=new xt,this.coordinateSystem=Yn,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorld.decompose(ea,ta,zn),zn.x===1&&zn.y===1&&zn.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(ea,ta,zn.set(1,1,1)).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorld.decompose(ea,ta,zn),zn.x===1&&zn.y===1&&zn.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(ea,ta,zn.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}}const Ci=new O,oh=new Le,lh=new Le;class hn extends Vf{constructor(e=50,t=1,n=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=s,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=_l*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(da*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return _l*2*Math.atan(Math.tan(da*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){Ci.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(Ci.x,Ci.y).multiplyScalar(-e/Ci.z),Ci.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Ci.x,Ci.y).multiplyScalar(-e/Ci.z)}getViewSize(e,t){return this.getViewBounds(e,oh,lh),t.subVectors(lh,oh)}setViewOffset(e,t,n,s,r,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(da*.5*this.fov)/this.zoom,n=2*t,s=this.aspect*n,r=-.5*s;const a=this.view;if(this.view!==null&&this.view.enabled){const l=a.fullWidth,c=a.fullHeight;r+=a.offsetX*s/l,t-=a.offsetY*n/c,s*=a.width/l,n*=a.height/c}const o=this.filmOffset;o!==0&&(r+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,t,t-n,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}class hp extends kf{constructor(){super(new hn(90,1,.5,500)),this.isPointLightShadow=!0}}class na extends Jl{constructor(e,t,n=0,s=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=s,this.shadow=new hp}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){super.dispose(),this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}toJSON(e){const t=super.toJSON(e);return t.object.distance=this.distance,t.object.decay=this.decay,t.object.shadow=this.shadow.toJSON(),t}}class Ql extends Vf{constructor(e=-1,t=1,n=1,s=-1,r=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=s,this.near=r,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,s,r,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,s=(this.top+this.bottom)/2;let r=n-e,a=n+e,o=s+t,l=s-t;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=c*this.view.offsetX,a=r+c*this.view.width,o-=h*this.view.offsetY,l=o-h*this.view.height}this.projectionMatrix.makeOrthographic(r,a,o,l,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}class fp extends kf{constructor(){super(new Ql(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class Gf extends Jl{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Ot.DEFAULT_UP),this.updateMatrix(),this.target=new Ot,this.shadow=new fp}dispose(){super.dispose(),this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}toJSON(e){const t=super.toJSON(e);return t.object.shadow=this.shadow.toJSON(),t.object.target=this.target.uuid,t}}class Hf extends Jl{constructor(e,t){super(e,t),this.isAmbientLight=!0,this.type="AmbientLight"}}const ws=-90,Ts=1;class up extends Ot{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const s=new hn(ws,Ts,e,t);s.layers=this.layers,this.add(s);const r=new hn(ws,Ts,e,t);r.layers=this.layers,this.add(r);const a=new hn(ws,Ts,e,t);a.layers=this.layers,this.add(a);const o=new hn(ws,Ts,e,t);o.layers=this.layers,this.add(o);const l=new hn(ws,Ts,e,t);l.layers=this.layers,this.add(l);const c=new hn(ws,Ts,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[n,s,r,a,o,l]=t;for(const c of t)this.remove(c);if(e===Yn)n.up.set(0,1,0),n.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===gr)n.up.set(0,-1,0),n.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const c of t)this.add(c),c.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:s}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[r,a,o,l,c,h]=this.children,u=e.getRenderTarget(),f=e.getActiveCubeFace(),d=e.getActiveMipmapLevel(),g=e.xr.enabled;e.xr.enabled=!1;const v=n.texture.generateMipmaps;n.texture.generateMipmaps=!1;let m=!1;e.isWebGLRenderer===!0?m=e.state.buffers.depth.getReversed():m=e.reversedDepthBuffer,e.setRenderTarget(n,0,s),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,r),e.setRenderTarget(n,1,s),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,a),e.setRenderTarget(n,2,s),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,o),e.setRenderTarget(n,3,s),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,l),e.setRenderTarget(n,4,s),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,c),n.texture.generateMipmaps=v,e.setRenderTarget(n,5,s),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,h),e.setRenderTarget(u,f,d),e.xr.enabled=g,n.texture.needsPMREMUpdate=!0}}class dp extends hn{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}}const ch=new xt;class pp{constructor(e,t,n=0,s=1/0){this.ray=new Sr(e,t),this.near=n,this.far=s,this.camera=null,this.layers=new $l,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,t){this.ray.set(e,t)}setFromCamera(e,t){t.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(t).sub(this.ray.origin).normalize(),this.camera=t):t.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,(t.near+t.far)/(t.near-t.far)).unproject(t),this.ray.direction.set(0,0,-1).transformDirection(t.matrixWorld),this.camera=t):Je("Raycaster: Unsupported camera type: "+t.type)}setFromXRController(e){return ch.identity().extractRotation(e.matrixWorld),this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(ch),this}intersectObject(e,t=!0,n=[]){return Sl(e,this,n,t),n.sort(hh),n}intersectObjects(e,t=!0,n=[]){for(let s=0,r=e.length;s<r;s++)Sl(e[s],this,n,t);return n.sort(hh),n}}function hh(i,e){return i.distance-e.distance}function Sl(i,e,t,n){let s=!0;if(i.layers.test(e.layers)&&i.raycast(e,t)===!1&&(s=!1),s===!0&&n===!0){const r=i.children;for(let a=0,o=r.length;a<o;a++)Sl(r[a],e,t,!0)}}class fh{constructor(e=1,t=0,n=0){this.radius=e,this.phi=t,this.theta=n}set(e,t,n){return this.radius=e,this.phi=t,this.theta=n,this}copy(e){return this.radius=e.radius,this.phi=e.phi,this.theta=e.theta,this}makeSafe(){return this.phi=Ye(this.phi,1e-6,Math.PI-1e-6),this}setFromVector3(e){return this.setFromCartesianCoords(e.x,e.y,e.z)}setFromCartesianCoords(e,t,n){return this.radius=Math.sqrt(e*e+t*t+n*n),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(e,n),this.phi=Math.acos(Ye(t/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}}class mp extends Ff{constructor(e=10,t=10,n=4473924,s=8947848){n=new He(n),s=new He(s);const r=t/2,a=e/t,o=e/2,l=[],c=[];for(let f=0,d=0,g=-o;f<=t;f++,g+=a){l.push(-o,0,g,o,0,g),l.push(g,0,-o,g,0,o);const v=f===r?n:s;v.toArray(c,d),d+=3,v.toArray(c,d),d+=3,v.toArray(c,d),d+=3,v.toArray(c,d),d+=3}const h=new Yt;h.setAttribute("position",new Lt(l,3)),h.setAttribute("color",new Lt(c,3));const u=new jl({vertexColors:!0,toneMapped:!1});super(h,u),this.type="GridHelper"}dispose(){this.geometry.dispose(),this.material.dispose()}}class gp extends Ff{constructor(e=1){const t=[0,0,0,e,0,0,0,0,0,0,e,0,0,0,0,0,0,e],n=[1,0,0,1,.6,0,0,1,0,.6,1,0,0,0,1,0,.6,1],s=new Yt;s.setAttribute("position",new Lt(t,3)),s.setAttribute("color",new Lt(n,3));const r=new jl({vertexColors:!0,toneMapped:!1});super(s,r),this.type="AxesHelper"}setColors(e,t,n){const s=new He,r=this.geometry.attributes.color.array;return s.set(e),s.toArray(r,0),s.toArray(r,3),s.set(t),s.toArray(r,6),s.toArray(r,9),s.set(n),s.toArray(r,12),s.toArray(r,15),this.geometry.attributes.color.needsUpdate=!0,this}dispose(){this.geometry.dispose(),this.material.dispose()}}class _p extends as{constructor(e,t=null){super(),this.object=e,this.domElement=t,this.enabled=!0,this.state=-1,this.keys={},this.mouseButtons={LEFT:null,MIDDLE:null,RIGHT:null},this.touches={ONE:null,TWO:null}}connect(e){if(e===void 0){Fe("Controls: connect() now requires an element.");return}this.domElement!==null&&this.disconnect(),this.domElement=e}disconnect(){}dispose(){}update(){}}function uh(i,e,t,n){const s=xp(n);switch(t){case bf:return i*e;case Tf:return i*e/s.components*s.byteLength;case kl:return i*e/s.components*s.byteLength;case ks:return i*e*2/s.components*s.byteLength;case Vl:return i*e*2/s.components*s.byteLength;case wf:return i*e*3/s.components*s.byteLength;case Fn:return i*e*4/s.components*s.byteLength;case Gl:return i*e*4/s.components*s.byteLength;case ca:case ha:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case fa:case ua:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case zo:case Vo:return Math.max(i,16)*Math.max(e,8)/4;case Bo:case ko:return Math.max(i,8)*Math.max(e,8)/2;case Go:case Ho:case Xo:case $o:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case Wo:case Yo:case qo:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case jo:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case Zo:return Math.floor((i+4)/5)*Math.floor((e+3)/4)*16;case Ko:return Math.floor((i+4)/5)*Math.floor((e+4)/5)*16;case Jo:return Math.floor((i+5)/6)*Math.floor((e+4)/5)*16;case Qo:return Math.floor((i+5)/6)*Math.floor((e+5)/6)*16;case el:return Math.floor((i+7)/8)*Math.floor((e+4)/5)*16;case tl:return Math.floor((i+7)/8)*Math.floor((e+5)/6)*16;case nl:return Math.floor((i+7)/8)*Math.floor((e+7)/8)*16;case il:return Math.floor((i+9)/10)*Math.floor((e+4)/5)*16;case sl:return Math.floor((i+9)/10)*Math.floor((e+5)/6)*16;case rl:return Math.floor((i+9)/10)*Math.floor((e+7)/8)*16;case al:return Math.floor((i+9)/10)*Math.floor((e+9)/10)*16;case ol:return Math.floor((i+11)/12)*Math.floor((e+9)/10)*16;case ll:return Math.floor((i+11)/12)*Math.floor((e+11)/12)*16;case cl:case hl:case fl:return Math.ceil(i/4)*Math.ceil(e/4)*16;case ul:case dl:return Math.ceil(i/4)*Math.ceil(e/4)*8;case pl:case ml:return Math.ceil(i/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function xp(i){switch(i){case yn:case yf:return{byteLength:1,components:1};case pr:case Sf:case _i:return{byteLength:2,components:1};case Bl:case zl:return{byteLength:2,components:4};case Qn:case Ol:case $n:return{byteLength:4,components:1};case Mf:case Ef:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${i}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Fl}}));typeof window<"u"&&(window.__THREE__?Fe("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Fl);function Wf(){let i=null,e=!1,t=null,n=null;function s(r,a){t(r,a),n=i.requestAnimationFrame(s)}return{start:function(){e!==!0&&t!==null&&(n=i.requestAnimationFrame(s),e=!0)},stop:function(){i.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(r){t=r},setContext:function(r){i=r}}}function vp(i){const e=new WeakMap;function t(o,l){const c=o.array,h=o.usage,u=c.byteLength,f=i.createBuffer();i.bindBuffer(l,f),i.bufferData(l,c,h),o.onUploadCallback();let d;if(c instanceof Float32Array)d=i.FLOAT;else if(typeof Float16Array<"u"&&c instanceof Float16Array)d=i.HALF_FLOAT;else if(c instanceof Uint16Array)o.isFloat16BufferAttribute?d=i.HALF_FLOAT:d=i.UNSIGNED_SHORT;else if(c instanceof Int16Array)d=i.SHORT;else if(c instanceof Uint32Array)d=i.UNSIGNED_INT;else if(c instanceof Int32Array)d=i.INT;else if(c instanceof Int8Array)d=i.BYTE;else if(c instanceof Uint8Array)d=i.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)d=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:f,type:d,bytesPerElement:c.BYTES_PER_ELEMENT,version:o.version,size:u}}function n(o,l,c){const h=l.array,u=l.updateRanges;if(i.bindBuffer(c,o),u.length===0)i.bufferSubData(c,0,h);else{u.sort((d,g)=>d.start-g.start);let f=0;for(let d=1;d<u.length;d++){const g=u[f],v=u[d];v.start<=g.start+g.count+1?g.count=Math.max(g.count,v.start+v.count-g.start):(++f,u[f]=v)}u.length=f+1;for(let d=0,g=u.length;d<g;d++){const v=u[d];i.bufferSubData(c,v.start*h.BYTES_PER_ELEMENT,h,v.start,v.count)}l.clearUpdateRanges()}l.onUploadCallback()}function s(o){return o.isInterleavedBufferAttribute&&(o=o.data),e.get(o)}function r(o){o.isInterleavedBufferAttribute&&(o=o.data);const l=e.get(o);l&&(i.deleteBuffer(l.buffer),e.delete(o))}function a(o,l){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){const h=e.get(o);(!h||h.version<o.version)&&e.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}const c=e.get(o);if(c===void 0)e.set(o,t(o,l));else if(c.version<o.version){if(c.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(c.buffer,o,l),c.version=o.version}}return{get:s,remove:r,update:a}}var yp=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Sp=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,Mp=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Ep=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,bp=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,wp=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Tp=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,Ap=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Cp=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec4 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 );
	}
#endif`,Rp=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Pp=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Dp=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Ip=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,Lp=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,Up=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,Np=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,Fp=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Op=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Bp=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,zp=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,kp=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,Vp=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,Gp=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec4( 1.0 );
#endif
#ifdef USE_COLOR_ALPHA
	vColor *= color;
#elif defined( USE_COLOR )
	vColor.rgb *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.rgb *= instanceColor.rgb;
#endif
#ifdef USE_BATCHING_COLOR
	vColor *= getBatchingColor( getIndirectIndex( gl_DrawID ) );
#endif`,Hp=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,Wp=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,Xp=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,$p=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Yp=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,qp=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,jp=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Zp="gl_FragColor = linearToOutputTexel( gl_FragColor );",Kp=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,Jp=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
		#ifdef ENVMAP_BLENDING_MULTIPLY
			outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_MIX )
			outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_ADD )
			outgoingLight += envColor.xyz * specularStrength * reflectivity;
		#endif
	#endif
#endif`,Qp=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,em=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,tm=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,nm=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,im=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,sm=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,rm=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,am=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,om=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,lm=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,cm=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,hm=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,fm=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,um=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, pow4( roughness ) ) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,dm=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,pm=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,mm=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,gm=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,_m=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.diffuseContribution = diffuseColor.rgb * ( 1.0 - metalnessFactor );
material.metalness = metalnessFactor;
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor;
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = vec3( 0.04 );
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.0001, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,xm=`uniform sampler2D dfgLUT;
struct PhysicalMaterial {
	vec3 diffuseColor;
	vec3 diffuseContribution;
	vec3 specularColor;
	vec3 specularColorBlended;
	float roughness;
	float metalness;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
		vec3 iridescenceFresnelDielectric;
		vec3 iridescenceFresnelMetallic;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return v;
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColorBlended;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transpose( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float rInv = 1.0 / ( roughness + 0.1 );
	float a = -1.9362 + 1.0678 * roughness + 0.4573 * r2 - 0.8469 * rInv;
	float b = -0.6014 + 0.5538 * roughness - 0.4670 * r2 - 0.1255 * rInv;
	float DG = exp( a * dotNV + b );
	return saturate( DG );
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
vec3 BRDF_GGX_Multiscatter( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 singleScatter = BRDF_GGX( lightDir, viewDir, normal, material );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 dfgV = texture2D( dfgLUT, vec2( material.roughness, dotNV ) ).rg;
	vec2 dfgL = texture2D( dfgLUT, vec2( material.roughness, dotNL ) ).rg;
	vec3 FssEss_V = material.specularColorBlended * dfgV.x + material.specularF90 * dfgV.y;
	vec3 FssEss_L = material.specularColorBlended * dfgL.x + material.specularF90 * dfgL.y;
	float Ess_V = dfgV.x + dfgV.y;
	float Ess_L = dfgL.x + dfgL.y;
	float Ems_V = 1.0 - Ess_V;
	float Ems_L = 1.0 - Ess_L;
	vec3 Favg = material.specularColorBlended + ( 1.0 - material.specularColorBlended ) * 0.047619;
	vec3 Fms = FssEss_V * FssEss_L * Favg / ( 1.0 - Ems_V * Ems_L * Favg + EPSILON );
	float compensationFactor = Ems_V * Ems_L;
	vec3 multiScatter = Fms * compensationFactor;
	return singleScatter + multiScatter;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColorBlended * t2.x + ( material.specularF90 - material.specularColorBlended ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseContribution * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
		#ifdef USE_CLEARCOAT
			vec3 Ncc = geometryClearcoatNormal;
			vec2 uvClearcoat = LTC_Uv( Ncc, viewDir, material.clearcoatRoughness );
			vec4 t1Clearcoat = texture2D( ltc_1, uvClearcoat );
			vec4 t2Clearcoat = texture2D( ltc_2, uvClearcoat );
			mat3 mInvClearcoat = mat3(
				vec3( t1Clearcoat.x, 0, t1Clearcoat.y ),
				vec3(             0, 1,             0 ),
				vec3( t1Clearcoat.z, 0, t1Clearcoat.w )
			);
			vec3 fresnelClearcoat = material.clearcoatF0 * t2Clearcoat.x + ( material.clearcoatF90 - material.clearcoatF0 ) * t2Clearcoat.y;
			clearcoatSpecularDirect += lightColor * fresnelClearcoat * LTC_Evaluate( Ncc, viewDir, position, mInvClearcoat, rectCoords );
		#endif
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
 
 		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
 
 		float sheenAlbedoV = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
 		float sheenAlbedoL = IBLSheenBRDF( geometryNormal, directLight.direction, material.sheenRoughness );
 
 		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * max( sheenAlbedoV, sheenAlbedoL );
 
 		irradiance *= sheenEnergyComp;
 
 	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX_Multiscatter( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseContribution );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 diffuse = irradiance * BRDF_Lambert( material.diffuseContribution );
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		diffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectDiffuse += diffuse;
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness ) * RECIPROCAL_PI;
 	#endif
	vec3 singleScatteringDielectric = vec3( 0.0 );
	vec3 multiScatteringDielectric = vec3( 0.0 );
	vec3 singleScatteringMetallic = vec3( 0.0 );
	vec3 multiScatteringMetallic = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnelDielectric, material.roughness, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.diffuseColor, material.specularF90, material.iridescence, material.iridescenceFresnelMetallic, material.roughness, singleScatteringMetallic, multiScatteringMetallic );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscattering( geometryNormal, geometryViewDir, material.diffuseColor, material.specularF90, material.roughness, singleScatteringMetallic, multiScatteringMetallic );
	#endif
	vec3 singleScattering = mix( singleScatteringDielectric, singleScatteringMetallic, material.metalness );
	vec3 multiScattering = mix( multiScatteringDielectric, multiScatteringMetallic, material.metalness );
	vec3 totalScatteringDielectric = singleScatteringDielectric + multiScatteringDielectric;
	vec3 diffuse = material.diffuseContribution * ( 1.0 - totalScatteringDielectric );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	vec3 indirectSpecular = radiance * singleScattering;
	indirectSpecular += multiScattering * cosineWeightedIrradiance;
	vec3 indirectDiffuse = diffuse * cosineWeightedIrradiance;
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		indirectSpecular *= sheenEnergyComp;
		indirectDiffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectSpecular += indirectSpecular;
	reflectedLight.indirectDiffuse += indirectDiffuse;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,vm=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnelDielectric = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceFresnelMetallic = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.diffuseColor );
		material.iridescenceFresnel = mix( material.iridescenceFresnelDielectric, material.iridescenceFresnelMetallic, material.metalness );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS ) && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,ym=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( ENVMAP_TYPE_CUBE_UV )
		#if defined( STANDARD ) || defined( LAMBERT ) || defined( PHONG )
			iblIrradiance += getIBLIrradiance( geometryNormal );
		#endif
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,Sm=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Mm=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Em=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,bm=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,wm=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Tm=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Am=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Cm=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,Rm=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Pm=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Dm=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Im=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,Lm=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Um=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Nm=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,Fm=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Om=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,Bm=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,zm=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,km=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Vm=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,Gm=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,Hm=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Wm=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Xm=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,$m=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Ym=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,qm=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	#ifdef USE_REVERSED_DEPTH_BUFFER
	
		return depth * ( far - near ) - far;
	#else
		return depth * ( near - far ) - near;
	#endif
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	
	#ifdef USE_REVERSED_DEPTH_BUFFER
		return ( near * far ) / ( ( near - far ) * depth - near );
	#else
		return ( near * far ) / ( ( far - near ) * depth - far );
	#endif
}`,jm=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Zm=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Km=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Jm=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Qm=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,eg=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,tg=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#else
			uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#endif
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#else
			uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#endif
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform samplerCubeShadow pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#elif defined( SHADOWMAP_TYPE_BASIC )
			uniform samplerCube pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#endif
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float interleavedGradientNoise( vec2 position ) {
			return fract( 52.9829189 * fract( dot( position, vec2( 0.06711056, 0.00583715 ) ) ) );
		}
		vec2 vogelDiskSample( int sampleIndex, int samplesCount, float phi ) {
			const float goldenAngle = 2.399963229728653;
			float r = sqrt( ( float( sampleIndex ) + 0.5 ) / float( samplesCount ) );
			float theta = float( sampleIndex ) * goldenAngle + phi;
			return vec2( cos( theta ), sin( theta ) ) * r;
		}
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float getShadow( sampler2DShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			shadowCoord.z += shadowBias;
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
				float radius = shadowRadius * texelSize.x;
				float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
				shadow = (
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 0, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 1, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 2, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 3, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 4, 5, phi ) * radius, shadowCoord.z ) )
				) * 0.2;
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#elif defined( SHADOWMAP_TYPE_VSM )
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 distribution = texture2D( shadowMap, shadowCoord.xy ).rg;
				float mean = distribution.x;
				float variance = distribution.y * distribution.y;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					float hard_shadow = step( mean, shadowCoord.z );
				#else
					float hard_shadow = step( shadowCoord.z, mean );
				#endif
				
				if ( hard_shadow == 1.0 ) {
					shadow = 1.0;
				} else {
					variance = max( variance, 0.0000001 );
					float d = shadowCoord.z - mean;
					float p_max = variance / ( variance + d * d );
					p_max = clamp( ( p_max - 0.3 ) / 0.65, 0.0, 1.0 );
					shadow = max( hard_shadow, p_max );
				}
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#else
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				float depth = texture2D( shadowMap, shadowCoord.xy ).r;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					shadow = step( depth, shadowCoord.z );
				#else
					shadow = step( shadowCoord.z, depth );
				#endif
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	#if defined( SHADOWMAP_TYPE_PCF )
	float getPointShadow( samplerCubeShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 bd3D = normalize( lightToPosition );
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			#ifdef USE_REVERSED_DEPTH_BUFFER
				float dp = ( shadowCameraNear * ( shadowCameraFar - viewSpaceZ ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp -= shadowBias;
			#else
				float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp += shadowBias;
			#endif
			float texelSize = shadowRadius / shadowMapSize.x;
			vec3 absDir = abs( bd3D );
			vec3 tangent = absDir.x > absDir.z ? vec3( 0.0, 1.0, 0.0 ) : vec3( 1.0, 0.0, 0.0 );
			tangent = normalize( cross( bd3D, tangent ) );
			vec3 bitangent = cross( bd3D, tangent );
			float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
			vec2 sample0 = vogelDiskSample( 0, 5, phi );
			vec2 sample1 = vogelDiskSample( 1, 5, phi );
			vec2 sample2 = vogelDiskSample( 2, 5, phi );
			vec2 sample3 = vogelDiskSample( 3, 5, phi );
			vec2 sample4 = vogelDiskSample( 4, 5, phi );
			shadow = (
				texture( shadowMap, vec4( bd3D + ( tangent * sample0.x + bitangent * sample0.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample1.x + bitangent * sample1.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample2.x + bitangent * sample2.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample3.x + bitangent * sample3.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample4.x + bitangent * sample4.y ) * texelSize, dp ) )
			) * 0.2;
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#elif defined( SHADOWMAP_TYPE_BASIC )
	float getPointShadow( samplerCube shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			float depth = textureCube( shadowMap, bd3D ).r;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				depth = 1.0 - depth;
			#endif
			shadow = step( dp, depth );
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#endif
	#endif
#endif`,ng=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,ig=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,sg=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0 && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,rg=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,ag=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,og=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,lg=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,cg=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,hg=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,fg=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,ug=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,dg=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseContribution, material.specularColorBlended, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,pg=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,mg=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,gg=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,_g=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,xg=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const vg=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,yg=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Sg=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Mg=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Eg=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,bg=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,wg=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,Tg=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,Ag=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,Cg=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = vec4( dist, 0.0, 0.0, 1.0 );
}`,Rg=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Pg=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Dg=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,Ig=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Lg=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,Ug=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Ng=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Fg=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Og=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,Bg=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,zg=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,kg=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( normalize( normal ) * 0.5 + 0.5, diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,Vg=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Gg=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Hg=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,Wg=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
 
		outgoingLight = outgoingLight + sheenSpecularDirect + sheenSpecularIndirect;
 
 	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Xg=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,$g=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Yg=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,qg=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,jg=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Zg=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Kg=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,Jg=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Ge={alphahash_fragment:yp,alphahash_pars_fragment:Sp,alphamap_fragment:Mp,alphamap_pars_fragment:Ep,alphatest_fragment:bp,alphatest_pars_fragment:wp,aomap_fragment:Tp,aomap_pars_fragment:Ap,batching_pars_vertex:Cp,batching_vertex:Rp,begin_vertex:Pp,beginnormal_vertex:Dp,bsdfs:Ip,iridescence_fragment:Lp,bumpmap_pars_fragment:Up,clipping_planes_fragment:Np,clipping_planes_pars_fragment:Fp,clipping_planes_pars_vertex:Op,clipping_planes_vertex:Bp,color_fragment:zp,color_pars_fragment:kp,color_pars_vertex:Vp,color_vertex:Gp,common:Hp,cube_uv_reflection_fragment:Wp,defaultnormal_vertex:Xp,displacementmap_pars_vertex:$p,displacementmap_vertex:Yp,emissivemap_fragment:qp,emissivemap_pars_fragment:jp,colorspace_fragment:Zp,colorspace_pars_fragment:Kp,envmap_fragment:Jp,envmap_common_pars_fragment:Qp,envmap_pars_fragment:em,envmap_pars_vertex:tm,envmap_physical_pars_fragment:um,envmap_vertex:nm,fog_vertex:im,fog_pars_vertex:sm,fog_fragment:rm,fog_pars_fragment:am,gradientmap_pars_fragment:om,lightmap_pars_fragment:lm,lights_lambert_fragment:cm,lights_lambert_pars_fragment:hm,lights_pars_begin:fm,lights_toon_fragment:dm,lights_toon_pars_fragment:pm,lights_phong_fragment:mm,lights_phong_pars_fragment:gm,lights_physical_fragment:_m,lights_physical_pars_fragment:xm,lights_fragment_begin:vm,lights_fragment_maps:ym,lights_fragment_end:Sm,logdepthbuf_fragment:Mm,logdepthbuf_pars_fragment:Em,logdepthbuf_pars_vertex:bm,logdepthbuf_vertex:wm,map_fragment:Tm,map_pars_fragment:Am,map_particle_fragment:Cm,map_particle_pars_fragment:Rm,metalnessmap_fragment:Pm,metalnessmap_pars_fragment:Dm,morphinstance_vertex:Im,morphcolor_vertex:Lm,morphnormal_vertex:Um,morphtarget_pars_vertex:Nm,morphtarget_vertex:Fm,normal_fragment_begin:Om,normal_fragment_maps:Bm,normal_pars_fragment:zm,normal_pars_vertex:km,normal_vertex:Vm,normalmap_pars_fragment:Gm,clearcoat_normal_fragment_begin:Hm,clearcoat_normal_fragment_maps:Wm,clearcoat_pars_fragment:Xm,iridescence_pars_fragment:$m,opaque_fragment:Ym,packing:qm,premultiplied_alpha_fragment:jm,project_vertex:Zm,dithering_fragment:Km,dithering_pars_fragment:Jm,roughnessmap_fragment:Qm,roughnessmap_pars_fragment:eg,shadowmap_pars_fragment:tg,shadowmap_pars_vertex:ng,shadowmap_vertex:ig,shadowmask_pars_fragment:sg,skinbase_vertex:rg,skinning_pars_vertex:ag,skinning_vertex:og,skinnormal_vertex:lg,specularmap_fragment:cg,specularmap_pars_fragment:hg,tonemapping_fragment:fg,tonemapping_pars_fragment:ug,transmission_fragment:dg,transmission_pars_fragment:pg,uv_pars_fragment:mg,uv_pars_vertex:gg,uv_vertex:_g,worldpos_vertex:xg,background_vert:vg,background_frag:yg,backgroundCube_vert:Sg,backgroundCube_frag:Mg,cube_vert:Eg,cube_frag:bg,depth_vert:wg,depth_frag:Tg,distance_vert:Ag,distance_frag:Cg,equirect_vert:Rg,equirect_frag:Pg,linedashed_vert:Dg,linedashed_frag:Ig,meshbasic_vert:Lg,meshbasic_frag:Ug,meshlambert_vert:Ng,meshlambert_frag:Fg,meshmatcap_vert:Og,meshmatcap_frag:Bg,meshnormal_vert:zg,meshnormal_frag:kg,meshphong_vert:Vg,meshphong_frag:Gg,meshphysical_vert:Hg,meshphysical_frag:Wg,meshtoon_vert:Xg,meshtoon_frag:$g,points_vert:Yg,points_frag:qg,shadow_vert:jg,shadow_frag:Zg,sprite_vert:Kg,sprite_frag:Jg},de={common:{diffuse:{value:new He(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Ve},alphaMap:{value:null},alphaMapTransform:{value:new Ve},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Ve}},envmap:{envMap:{value:null},envMapRotation:{value:new Ve},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Ve}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Ve}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Ve},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Ve},normalScale:{value:new Le(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Ve},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Ve}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Ve}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Ve}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new He(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new He(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Ve},alphaTest:{value:0},uvTransform:{value:new Ve}},sprite:{diffuse:{value:new He(16777215)},opacity:{value:1},center:{value:new Le(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Ve},alphaMap:{value:null},alphaMapTransform:{value:new Ve},alphaTest:{value:0}}},Gn={basic:{uniforms:an([de.common,de.specularmap,de.envmap,de.aomap,de.lightmap,de.fog]),vertexShader:Ge.meshbasic_vert,fragmentShader:Ge.meshbasic_frag},lambert:{uniforms:an([de.common,de.specularmap,de.envmap,de.aomap,de.lightmap,de.emissivemap,de.bumpmap,de.normalmap,de.displacementmap,de.fog,de.lights,{emissive:{value:new He(0)},envMapIntensity:{value:1}}]),vertexShader:Ge.meshlambert_vert,fragmentShader:Ge.meshlambert_frag},phong:{uniforms:an([de.common,de.specularmap,de.envmap,de.aomap,de.lightmap,de.emissivemap,de.bumpmap,de.normalmap,de.displacementmap,de.fog,de.lights,{emissive:{value:new He(0)},specular:{value:new He(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:Ge.meshphong_vert,fragmentShader:Ge.meshphong_frag},standard:{uniforms:an([de.common,de.envmap,de.aomap,de.lightmap,de.emissivemap,de.bumpmap,de.normalmap,de.displacementmap,de.roughnessmap,de.metalnessmap,de.fog,de.lights,{emissive:{value:new He(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Ge.meshphysical_vert,fragmentShader:Ge.meshphysical_frag},toon:{uniforms:an([de.common,de.aomap,de.lightmap,de.emissivemap,de.bumpmap,de.normalmap,de.displacementmap,de.gradientmap,de.fog,de.lights,{emissive:{value:new He(0)}}]),vertexShader:Ge.meshtoon_vert,fragmentShader:Ge.meshtoon_frag},matcap:{uniforms:an([de.common,de.bumpmap,de.normalmap,de.displacementmap,de.fog,{matcap:{value:null}}]),vertexShader:Ge.meshmatcap_vert,fragmentShader:Ge.meshmatcap_frag},points:{uniforms:an([de.points,de.fog]),vertexShader:Ge.points_vert,fragmentShader:Ge.points_frag},dashed:{uniforms:an([de.common,de.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Ge.linedashed_vert,fragmentShader:Ge.linedashed_frag},depth:{uniforms:an([de.common,de.displacementmap]),vertexShader:Ge.depth_vert,fragmentShader:Ge.depth_frag},normal:{uniforms:an([de.common,de.bumpmap,de.normalmap,de.displacementmap,{opacity:{value:1}}]),vertexShader:Ge.meshnormal_vert,fragmentShader:Ge.meshnormal_frag},sprite:{uniforms:an([de.sprite,de.fog]),vertexShader:Ge.sprite_vert,fragmentShader:Ge.sprite_frag},background:{uniforms:{uvTransform:{value:new Ve},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Ge.background_vert,fragmentShader:Ge.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Ve}},vertexShader:Ge.backgroundCube_vert,fragmentShader:Ge.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Ge.cube_vert,fragmentShader:Ge.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Ge.equirect_vert,fragmentShader:Ge.equirect_frag},distance:{uniforms:an([de.common,de.displacementmap,{referencePosition:{value:new O},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Ge.distance_vert,fragmentShader:Ge.distance_frag},shadow:{uniforms:an([de.lights,de.fog,{color:{value:new He(0)},opacity:{value:1}}]),vertexShader:Ge.shadow_vert,fragmentShader:Ge.shadow_frag}};Gn.physical={uniforms:an([Gn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Ve},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Ve},clearcoatNormalScale:{value:new Le(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Ve},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Ve},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Ve},sheen:{value:0},sheenColor:{value:new He(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Ve},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Ve},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Ve},transmissionSamplerSize:{value:new Le},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Ve},attenuationDistance:{value:0},attenuationColor:{value:new He(0)},specularColor:{value:new He(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Ve},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Ve},anisotropyVector:{value:new Le},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Ve}}]),vertexShader:Ge.meshphysical_vert,fragmentShader:Ge.meshphysical_frag};const ia={r:0,b:0,g:0},$i=new ei,Qg=new xt;function e0(i,e,t,n,s,r){const a=new He(0);let o=s===!0?0:1,l,c,h=null,u=0,f=null;function d(y){let w=y.isScene===!0?y.background:null;if(w&&w.isTexture){const M=y.backgroundBlurriness>0;w=e.get(w,M)}return w}function g(y){let w=!1;const M=d(y);M===null?m(a,o):M&&M.isColor&&(m(M,1),w=!0);const D=i.xr.getEnvironmentBlendMode();D==="additive"?t.buffers.color.setClear(0,0,0,1,r):D==="alpha-blend"&&t.buffers.color.setClear(0,0,0,0,r),(i.autoClear||w)&&(t.buffers.depth.setTest(!0),t.buffers.depth.setMask(!0),t.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function v(y,w){const M=d(w);M&&(M.isCubeTexture||M.mapping===Ra)?(c===void 0&&(c=new Ie(new Mt(1,1,1),new ti({name:"BackgroundCubeMaterial",uniforms:Gs(Gn.backgroundCube.uniforms),vertexShader:Gn.backgroundCube.vertexShader,fragmentShader:Gn.backgroundCube.fragmentShader,side:un,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),c.geometry.deleteAttribute("uv"),c.onBeforeRender=function(D,R,L){this.matrixWorld.copyPosition(L.matrixWorld)},Object.defineProperty(c.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),n.update(c)),$i.copy(w.backgroundRotation),$i.x*=-1,$i.y*=-1,$i.z*=-1,M.isCubeTexture&&M.isRenderTargetTexture===!1&&($i.y*=-1,$i.z*=-1),c.material.uniforms.envMap.value=M,c.material.uniforms.flipEnvMap.value=M.isCubeTexture&&M.isRenderTargetTexture===!1?-1:1,c.material.uniforms.backgroundBlurriness.value=w.backgroundBlurriness,c.material.uniforms.backgroundIntensity.value=w.backgroundIntensity,c.material.uniforms.backgroundRotation.value.setFromMatrix4(Qg.makeRotationFromEuler($i)),c.material.toneMapped=et.getTransfer(M.colorSpace)!==at,(h!==M||u!==M.version||f!==i.toneMapping)&&(c.material.needsUpdate=!0,h=M,u=M.version,f=i.toneMapping),c.layers.enableAll(),y.unshift(c,c.geometry,c.material,0,0,null)):M&&M.isTexture&&(l===void 0&&(l=new Ie(new An(2,2),new ti({name:"BackgroundMaterial",uniforms:Gs(Gn.background.uniforms),vertexShader:Gn.background.vertexShader,fragmentShader:Gn.background.fragmentShader,side:Fi,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),n.update(l)),l.material.uniforms.t2D.value=M,l.material.uniforms.backgroundIntensity.value=w.backgroundIntensity,l.material.toneMapped=et.getTransfer(M.colorSpace)!==at,M.matrixAutoUpdate===!0&&M.updateMatrix(),l.material.uniforms.uvTransform.value.copy(M.matrix),(h!==M||u!==M.version||f!==i.toneMapping)&&(l.material.needsUpdate=!0,h=M,u=M.version,f=i.toneMapping),l.layers.enableAll(),y.unshift(l,l.geometry,l.material,0,0,null))}function m(y,w){y.getRGB(ia,zf(i)),t.buffers.color.setClear(ia.r,ia.g,ia.b,w,r)}function p(){c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0),l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0)}return{getClearColor:function(){return a},setClearColor:function(y,w=1){a.set(y),o=w,m(a,o)},getClearAlpha:function(){return o},setClearAlpha:function(y){o=y,m(a,o)},render:g,addToRenderList:v,dispose:p}}function t0(i,e){const t=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},s=f(null);let r=s,a=!1;function o(I,G,b,U,C){let P=!1;const A=u(I,U,b,G);r!==A&&(r=A,c(r.object)),P=d(I,U,b,C),P&&g(I,U,b,C),C!==null&&e.update(C,i.ELEMENT_ARRAY_BUFFER),(P||a)&&(a=!1,M(I,G,b,U),C!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,e.get(C).buffer))}function l(){return i.createVertexArray()}function c(I){return i.bindVertexArray(I)}function h(I){return i.deleteVertexArray(I)}function u(I,G,b,U){const C=U.wireframe===!0;let P=n[G.id];P===void 0&&(P={},n[G.id]=P);const A=I.isInstancedMesh===!0?I.id:0;let q=P[A];q===void 0&&(q={},P[A]=q);let j=q[b.id];j===void 0&&(j={},q[b.id]=j);let ee=j[C];return ee===void 0&&(ee=f(l()),j[C]=ee),ee}function f(I){const G=[],b=[],U=[];for(let C=0;C<t;C++)G[C]=0,b[C]=0,U[C]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:G,enabledAttributes:b,attributeDivisors:U,object:I,attributes:{},index:null}}function d(I,G,b,U){const C=r.attributes,P=G.attributes;let A=0;const q=b.getAttributes();for(const j in q)if(q[j].location>=0){const se=C[j];let ie=P[j];if(ie===void 0&&(j==="instanceMatrix"&&I.instanceMatrix&&(ie=I.instanceMatrix),j==="instanceColor"&&I.instanceColor&&(ie=I.instanceColor)),se===void 0||se.attribute!==ie||ie&&se.data!==ie.data)return!0;A++}return r.attributesNum!==A||r.index!==U}function g(I,G,b,U){const C={},P=G.attributes;let A=0;const q=b.getAttributes();for(const j in q)if(q[j].location>=0){let se=P[j];se===void 0&&(j==="instanceMatrix"&&I.instanceMatrix&&(se=I.instanceMatrix),j==="instanceColor"&&I.instanceColor&&(se=I.instanceColor));const ie={};ie.attribute=se,se&&se.data&&(ie.data=se.data),C[j]=ie,A++}r.attributes=C,r.attributesNum=A,r.index=U}function v(){const I=r.newAttributes;for(let G=0,b=I.length;G<b;G++)I[G]=0}function m(I){p(I,0)}function p(I,G){const b=r.newAttributes,U=r.enabledAttributes,C=r.attributeDivisors;b[I]=1,U[I]===0&&(i.enableVertexAttribArray(I),U[I]=1),C[I]!==G&&(i.vertexAttribDivisor(I,G),C[I]=G)}function y(){const I=r.newAttributes,G=r.enabledAttributes;for(let b=0,U=G.length;b<U;b++)G[b]!==I[b]&&(i.disableVertexAttribArray(b),G[b]=0)}function w(I,G,b,U,C,P,A){A===!0?i.vertexAttribIPointer(I,G,b,C,P):i.vertexAttribPointer(I,G,b,U,C,P)}function M(I,G,b,U){v();const C=U.attributes,P=b.getAttributes(),A=G.defaultAttributeValues;for(const q in P){const j=P[q];if(j.location>=0){let ee=C[q];if(ee===void 0&&(q==="instanceMatrix"&&I.instanceMatrix&&(ee=I.instanceMatrix),q==="instanceColor"&&I.instanceColor&&(ee=I.instanceColor)),ee!==void 0){const se=ee.normalized,ie=ee.itemSize,Pe=e.get(ee);if(Pe===void 0)continue;const qe=Pe.buffer,Ke=Pe.type,J=Pe.bytesPerElement,ae=Ke===i.INT||Ke===i.UNSIGNED_INT||ee.gpuType===Ol;if(ee.isInterleavedBufferAttribute){const ue=ee.data,ke=ue.stride,Ue=ee.offset;if(ue.isInstancedInterleavedBuffer){for(let Oe=0;Oe<j.locationSize;Oe++)p(j.location+Oe,ue.meshPerAttribute);I.isInstancedMesh!==!0&&U._maxInstanceCount===void 0&&(U._maxInstanceCount=ue.meshPerAttribute*ue.count)}else for(let Oe=0;Oe<j.locationSize;Oe++)m(j.location+Oe);i.bindBuffer(i.ARRAY_BUFFER,qe);for(let Oe=0;Oe<j.locationSize;Oe++)w(j.location+Oe,ie/j.locationSize,Ke,se,ke*J,(Ue+ie/j.locationSize*Oe)*J,ae)}else{if(ee.isInstancedBufferAttribute){for(let ue=0;ue<j.locationSize;ue++)p(j.location+ue,ee.meshPerAttribute);I.isInstancedMesh!==!0&&U._maxInstanceCount===void 0&&(U._maxInstanceCount=ee.meshPerAttribute*ee.count)}else for(let ue=0;ue<j.locationSize;ue++)m(j.location+ue);i.bindBuffer(i.ARRAY_BUFFER,qe);for(let ue=0;ue<j.locationSize;ue++)w(j.location+ue,ie/j.locationSize,Ke,se,ie*J,ie/j.locationSize*ue*J,ae)}}else if(A!==void 0){const se=A[q];if(se!==void 0)switch(se.length){case 2:i.vertexAttrib2fv(j.location,se);break;case 3:i.vertexAttrib3fv(j.location,se);break;case 4:i.vertexAttrib4fv(j.location,se);break;default:i.vertexAttrib1fv(j.location,se)}}}}y()}function D(){E();for(const I in n){const G=n[I];for(const b in G){const U=G[b];for(const C in U){const P=U[C];for(const A in P)h(P[A].object),delete P[A];delete U[C]}}delete n[I]}}function R(I){if(n[I.id]===void 0)return;const G=n[I.id];for(const b in G){const U=G[b];for(const C in U){const P=U[C];for(const A in P)h(P[A].object),delete P[A];delete U[C]}}delete n[I.id]}function L(I){for(const G in n){const b=n[G];for(const U in b){const C=b[U];if(C[I.id]===void 0)continue;const P=C[I.id];for(const A in P)h(P[A].object),delete P[A];delete C[I.id]}}}function x(I){for(const G in n){const b=n[G],U=I.isInstancedMesh===!0?I.id:0,C=b[U];if(C!==void 0){for(const P in C){const A=C[P];for(const q in A)h(A[q].object),delete A[q];delete C[P]}delete b[U],Object.keys(b).length===0&&delete n[G]}}}function E(){X(),a=!0,r!==s&&(r=s,c(r.object))}function X(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:o,reset:E,resetDefaultState:X,dispose:D,releaseStatesOfGeometry:R,releaseStatesOfObject:x,releaseStatesOfProgram:L,initAttributes:v,enableAttribute:m,disableUnusedAttributes:y}}function n0(i,e,t){let n;function s(c){n=c}function r(c,h){i.drawArrays(n,c,h),t.update(h,n,1)}function a(c,h,u){u!==0&&(i.drawArraysInstanced(n,c,h,u),t.update(h,n,u))}function o(c,h,u){if(u===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,c,0,h,0,u);let d=0;for(let g=0;g<u;g++)d+=h[g];t.update(d,n,1)}function l(c,h,u,f){if(u===0)return;const d=e.get("WEBGL_multi_draw");if(d===null)for(let g=0;g<c.length;g++)a(c[g],h[g],f[g]);else{d.multiDrawArraysInstancedWEBGL(n,c,0,h,0,f,0,u);let g=0;for(let v=0;v<u;v++)g+=h[v]*f[v];t.update(g,n,1)}}this.setMode=s,this.render=r,this.renderInstances=a,this.renderMultiDraw=o,this.renderMultiDrawInstances=l}function i0(i,e,t,n){let s;function r(){if(s!==void 0)return s;if(e.has("EXT_texture_filter_anisotropic")===!0){const L=e.get("EXT_texture_filter_anisotropic");s=i.getParameter(L.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function a(L){return!(L!==Fn&&n.convert(L)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(L){const x=L===_i&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(L!==yn&&n.convert(L)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE)&&L!==$n&&!x)}function l(L){if(L==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";L="mediump"}return L==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=t.precision!==void 0?t.precision:"highp";const h=l(c);h!==c&&(Fe("WebGLRenderer:",c,"not supported, using",h,"instead."),c=h);const u=t.logarithmicDepthBuffer===!0,f=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control"),d=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),g=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),v=i.getParameter(i.MAX_TEXTURE_SIZE),m=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),p=i.getParameter(i.MAX_VERTEX_ATTRIBS),y=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),w=i.getParameter(i.MAX_VARYING_VECTORS),M=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),D=i.getParameter(i.MAX_SAMPLES),R=i.getParameter(i.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:l,textureFormatReadable:a,textureTypeReadable:o,precision:c,logarithmicDepthBuffer:u,reversedDepthBuffer:f,maxTextures:d,maxVertexTextures:g,maxTextureSize:v,maxCubemapSize:m,maxAttributes:p,maxVertexUniforms:y,maxVaryings:w,maxFragmentUniforms:M,maxSamples:D,samples:R}}function s0(i){const e=this;let t=null,n=0,s=!1,r=!1;const a=new fi,o=new Ve,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(u,f){const d=u.length!==0||f||n!==0||s;return s=f,n=u.length,d},this.beginShadows=function(){r=!0,h(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(u,f){t=h(u,f,0)},this.setState=function(u,f,d){const g=u.clippingPlanes,v=u.clipIntersection,m=u.clipShadows,p=i.get(u);if(!s||g===null||g.length===0||r&&!m)r?h(null):c();else{const y=r?0:n,w=y*4;let M=p.clippingState||null;l.value=M,M=h(g,f,w,d);for(let D=0;D!==w;++D)M[D]=t[D];p.clippingState=M,this.numIntersection=v?this.numPlanes:0,this.numPlanes+=y}};function c(){l.value!==t&&(l.value=t,l.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function h(u,f,d,g){const v=u!==null?u.length:0;let m=null;if(v!==0){if(m=l.value,g!==!0||m===null){const p=d+v*4,y=f.matrixWorldInverse;o.getNormalMatrix(y),(m===null||m.length<p)&&(m=new Float32Array(p));for(let w=0,M=d;w!==v;++w,M+=4)a.copy(u[w]).applyMatrix4(y,o),a.normal.toArray(m,M),m[M+3]=a.constant}l.value=m,l.needsUpdate=!0}return e.numPlanes=v,e.numIntersection=0,m}}const Di=4,dh=[.125,.215,.35,.446,.526,.582],Ji=20,r0=256,sr=new Ql,ph=new He;let _o=null,xo=0,vo=0,yo=!1;const a0=new O;class mh{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._sigmas=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(e,t=0,n=.1,s=100,r={}){const{size:a=256,position:o=a0}=r;_o=this._renderer.getRenderTarget(),xo=this._renderer.getActiveCubeFace(),vo=this._renderer.getActiveMipmapLevel(),yo=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(a);const l=this._allocateTargets();return l.depthBuffer=!0,this._sceneToCubeUV(e,n,s,l,o),t>0&&this._blur(l,0,0,t),this._applyPMREM(l),this._cleanup(l),l}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=xh(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=_h(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodMeshes.length;e++)this._lodMeshes[e].geometry.dispose()}_cleanup(e){this._renderer.setRenderTarget(_o,xo,vo),this._renderer.xr.enabled=yo,e.scissorTest=!1,As(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===ts||e.mapping===zs?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),_o=this._renderer.getRenderTarget(),xo=this._renderer.getActiveCubeFace(),vo=this._renderer.getActiveMipmapLevel(),yo=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:$t,minFilter:$t,generateMipmaps:!1,type:_i,format:Fn,colorSpace:Vs,depthBuffer:!1},s=gh(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=gh(e,t,n);const{_lodMax:r}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods,sigmas:this._sigmas}=o0(r)),this._blurMaterial=c0(r,e,t),this._ggxMaterial=l0(r,e,t)}return s}_compileMaterial(e){const t=new Ie(new Yt,e);this._renderer.compile(t,sr)}_sceneToCubeUV(e,t,n,s,r){const l=new hn(90,1,t,n),c=[1,-1,1,1,1,1],h=[1,1,1,-1,-1,-1],u=this._renderer,f=u.autoClear,d=u.toneMapping;u.getClearColor(ph),u.toneMapping=qn,u.autoClear=!1,u.state.buffers.depth.getReversed()&&(u.setRenderTarget(s),u.clearDepth(),u.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new Ie(new Mt,new Fs({name:"PMREM.Background",side:un,depthWrite:!1,depthTest:!1})));const v=this._backgroundBox,m=v.material;let p=!1;const y=e.background;y?y.isColor&&(m.color.copy(y),e.background=null,p=!0):(m.color.copy(ph),p=!0);for(let w=0;w<6;w++){const M=w%3;M===0?(l.up.set(0,c[w],0),l.position.set(r.x,r.y,r.z),l.lookAt(r.x+h[w],r.y,r.z)):M===1?(l.up.set(0,0,c[w]),l.position.set(r.x,r.y,r.z),l.lookAt(r.x,r.y+h[w],r.z)):(l.up.set(0,c[w],0),l.position.set(r.x,r.y,r.z),l.lookAt(r.x,r.y,r.z+h[w]));const D=this._cubeSize;As(s,M*D,w>2?D:0,D,D),u.setRenderTarget(s),p&&u.render(v,l),u.render(e,l)}u.toneMapping=d,u.autoClear=f,e.background=y}_textureToCubeUV(e,t){const n=this._renderer,s=e.mapping===ts||e.mapping===zs;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=xh()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=_h());const r=s?this._cubemapMaterial:this._equirectMaterial,a=this._lodMeshes[0];a.material=r;const o=r.uniforms;o.envMap.value=e;const l=this._cubeSize;As(t,0,0,3*l,2*l),n.setRenderTarget(t),n.render(a,sr)}_applyPMREM(e){const t=this._renderer,n=t.autoClear;t.autoClear=!1;const s=this._lodMeshes.length;for(let r=1;r<s;r++)this._applyGGXFilter(e,r-1,r);t.autoClear=n}_applyGGXFilter(e,t,n){const s=this._renderer,r=this._pingPongRenderTarget,a=this._ggxMaterial,o=this._lodMeshes[n];o.material=a;const l=a.uniforms,c=n/(this._lodMeshes.length-1),h=t/(this._lodMeshes.length-1),u=Math.sqrt(c*c-h*h),f=0+c*1.25,d=u*f,{_lodMax:g}=this,v=this._sizeLods[n],m=3*v*(n>g-Di?n-g+Di:0),p=4*(this._cubeSize-v);l.envMap.value=e.texture,l.roughness.value=d,l.mipInt.value=g-t,As(r,m,p,3*v,2*v),s.setRenderTarget(r),s.render(o,sr),l.envMap.value=r.texture,l.roughness.value=0,l.mipInt.value=g-n,As(e,m,p,3*v,2*v),s.setRenderTarget(e),s.render(o,sr)}_blur(e,t,n,s,r){const a=this._pingPongRenderTarget;this._halfBlur(e,a,t,n,s,"latitudinal",r),this._halfBlur(a,e,n,n,s,"longitudinal",r)}_halfBlur(e,t,n,s,r,a,o){const l=this._renderer,c=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&Je("blur direction must be either latitudinal or longitudinal!");const h=3,u=this._lodMeshes[s];u.material=c;const f=c.uniforms,d=this._sizeLods[n]-1,g=isFinite(r)?Math.PI/(2*d):2*Math.PI/(2*Ji-1),v=r/g,m=isFinite(r)?1+Math.floor(h*v):Ji;m>Ji&&Fe(`sigmaRadians, ${r}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${Ji}`);const p=[];let y=0;for(let L=0;L<Ji;++L){const x=L/v,E=Math.exp(-x*x/2);p.push(E),L===0?y+=E:L<m&&(y+=2*E)}for(let L=0;L<p.length;L++)p[L]=p[L]/y;f.envMap.value=e.texture,f.samples.value=m,f.weights.value=p,f.latitudinal.value=a==="latitudinal",o&&(f.poleAxis.value=o);const{_lodMax:w}=this;f.dTheta.value=g,f.mipInt.value=w-n;const M=this._sizeLods[s],D=3*M*(s>w-Di?s-w+Di:0),R=4*(this._cubeSize-M);As(t,D,R,3*M,2*M),l.setRenderTarget(t),l.render(u,sr)}}function o0(i){const e=[],t=[],n=[];let s=i;const r=i-Di+1+dh.length;for(let a=0;a<r;a++){const o=Math.pow(2,s);e.push(o);let l=1/o;a>i-Di?l=dh[a-i+Di-1]:a===0&&(l=0),t.push(l);const c=1/(o-2),h=-c,u=1+c,f=[h,h,u,h,u,u,h,h,u,u,h,u],d=6,g=6,v=3,m=2,p=1,y=new Float32Array(v*g*d),w=new Float32Array(m*g*d),M=new Float32Array(p*g*d);for(let R=0;R<d;R++){const L=R%3*2/3-1,x=R>2?0:-1,E=[L,x,0,L+2/3,x,0,L+2/3,x+1,0,L,x,0,L+2/3,x+1,0,L,x+1,0];y.set(E,v*g*R),w.set(f,m*g*R);const X=[R,R,R,R,R,R];M.set(X,p*g*R)}const D=new Yt;D.setAttribute("position",new Sn(y,v)),D.setAttribute("uv",new Sn(w,m)),D.setAttribute("faceIndex",new Sn(M,p)),n.push(new Ie(D,null)),s>Di&&s--}return{lodMeshes:n,sizeLods:e,sigmas:t}}function gh(i,e,t){const n=new jn(i,e,t);return n.texture.mapping=Ra,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function As(i,e,t,n,s){i.viewport.set(e,t,n,s),i.scissor.set(e,t,n,s)}function l0(i,e,t){return new ti({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:r0,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:Pa(),fragmentShader:`

			precision highp float;
			precision highp int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform float roughness;
			uniform float mipInt;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			#define PI 3.14159265359

			// Van der Corput radical inverse
			float radicalInverse_VdC(uint bits) {
				bits = (bits << 16u) | (bits >> 16u);
				bits = ((bits & 0x55555555u) << 1u) | ((bits & 0xAAAAAAAAu) >> 1u);
				bits = ((bits & 0x33333333u) << 2u) | ((bits & 0xCCCCCCCCu) >> 2u);
				bits = ((bits & 0x0F0F0F0Fu) << 4u) | ((bits & 0xF0F0F0F0u) >> 4u);
				bits = ((bits & 0x00FF00FFu) << 8u) | ((bits & 0xFF00FF00u) >> 8u);
				return float(bits) * 2.3283064365386963e-10; // / 0x100000000
			}

			// Hammersley sequence
			vec2 hammersley(uint i, uint N) {
				return vec2(float(i) / float(N), radicalInverse_VdC(i));
			}

			// GGX VNDF importance sampling (Eric Heitz 2018)
			// "Sampling the GGX Distribution of Visible Normals"
			// https://jcgt.org/published/0007/04/01/
			vec3 importanceSampleGGX_VNDF(vec2 Xi, vec3 V, float roughness) {
				float alpha = roughness * roughness;

				// Section 4.1: Orthonormal basis
				vec3 T1 = vec3(1.0, 0.0, 0.0);
				vec3 T2 = cross(V, T1);

				// Section 4.2: Parameterization of projected area
				float r = sqrt(Xi.x);
				float phi = 2.0 * PI * Xi.y;
				float t1 = r * cos(phi);
				float t2 = r * sin(phi);
				float s = 0.5 * (1.0 + V.z);
				t2 = (1.0 - s) * sqrt(1.0 - t1 * t1) + s * t2;

				// Section 4.3: Reprojection onto hemisphere
				vec3 Nh = t1 * T1 + t2 * T2 + sqrt(max(0.0, 1.0 - t1 * t1 - t2 * t2)) * V;

				// Section 3.4: Transform back to ellipsoid configuration
				return normalize(vec3(alpha * Nh.x, alpha * Nh.y, max(0.0, Nh.z)));
			}

			void main() {
				vec3 N = normalize(vOutputDirection);
				vec3 V = N; // Assume view direction equals normal for pre-filtering

				vec3 prefilteredColor = vec3(0.0);
				float totalWeight = 0.0;

				// For very low roughness, just sample the environment directly
				if (roughness < 0.001) {
					gl_FragColor = vec4(bilinearCubeUV(envMap, N, mipInt), 1.0);
					return;
				}

				// Tangent space basis for VNDF sampling
				vec3 up = abs(N.z) < 0.999 ? vec3(0.0, 0.0, 1.0) : vec3(1.0, 0.0, 0.0);
				vec3 tangent = normalize(cross(up, N));
				vec3 bitangent = cross(N, tangent);

				for(uint i = 0u; i < uint(GGX_SAMPLES); i++) {
					vec2 Xi = hammersley(i, uint(GGX_SAMPLES));

					// For PMREM, V = N, so in tangent space V is always (0, 0, 1)
					vec3 H_tangent = importanceSampleGGX_VNDF(Xi, vec3(0.0, 0.0, 1.0), roughness);

					// Transform H back to world space
					vec3 H = normalize(tangent * H_tangent.x + bitangent * H_tangent.y + N * H_tangent.z);
					vec3 L = normalize(2.0 * dot(V, H) * H - V);

					float NdotL = max(dot(N, L), 0.0);

					if(NdotL > 0.0) {
						// Sample environment at fixed mip level
						// VNDF importance sampling handles the distribution filtering
						vec3 sampleColor = bilinearCubeUV(envMap, L, mipInt);

						// Weight by NdotL for the split-sum approximation
						// VNDF PDF naturally accounts for the visible microfacet distribution
						prefilteredColor += sampleColor * NdotL;
						totalWeight += NdotL;
					}
				}

				if (totalWeight > 0.0) {
					prefilteredColor = prefilteredColor / totalWeight;
				}

				gl_FragColor = vec4(prefilteredColor, 1.0);
			}
		`,blending:pi,depthTest:!1,depthWrite:!1})}function c0(i,e,t){const n=new Float32Array(Ji),s=new O(0,1,0);return new ti({name:"SphericalGaussianBlur",defines:{n:Ji,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:Pa(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:pi,depthTest:!1,depthWrite:!1})}function _h(){return new ti({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Pa(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:pi,depthTest:!1,depthWrite:!1})}function xh(){return new ti({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Pa(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:pi,depthTest:!1,depthWrite:!1})}function Pa(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}class Xf extends jn{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const n={width:e,height:e,depth:1},s=[n,n,n,n,n,n];this.texture=new Of(s),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},s=new Mt(5,5,5),r=new ti({name:"CubemapFromEquirect",uniforms:Gs(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:un,blending:pi});r.uniforms.tEquirect.value=t;const a=new Ie(s,r),o=t.minFilter;return t.minFilter===Qi&&(t.minFilter=$t),new up(1,10,this).update(e,a),t.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,t=!0,n=!0,s=!0){const r=e.getRenderTarget();for(let a=0;a<6;a++)e.setRenderTarget(this,a),e.clear(t,n,s);e.setRenderTarget(r)}}function h0(i){let e=new WeakMap,t=new WeakMap,n=null;function s(f,d=!1){return f==null?null:d?a(f):r(f)}function r(f){if(f&&f.isTexture){const d=f.mapping;if(d===Va||d===Ga)if(e.has(f)){const g=e.get(f).texture;return o(g,f.mapping)}else{const g=f.image;if(g&&g.height>0){const v=new Xf(g.height);return v.fromEquirectangularTexture(i,f),e.set(f,v),f.addEventListener("dispose",c),o(v.texture,f.mapping)}else return null}}return f}function a(f){if(f&&f.isTexture){const d=f.mapping,g=d===Va||d===Ga,v=d===ts||d===zs;if(g||v){let m=t.get(f);const p=m!==void 0?m.texture.pmremVersion:0;if(f.isRenderTargetTexture&&f.pmremVersion!==p)return n===null&&(n=new mh(i)),m=g?n.fromEquirectangular(f,m):n.fromCubemap(f,m),m.texture.pmremVersion=f.pmremVersion,t.set(f,m),m.texture;if(m!==void 0)return m.texture;{const y=f.image;return g&&y&&y.height>0||v&&y&&l(y)?(n===null&&(n=new mh(i)),m=g?n.fromEquirectangular(f):n.fromCubemap(f),m.texture.pmremVersion=f.pmremVersion,t.set(f,m),f.addEventListener("dispose",h),m.texture):null}}}return f}function o(f,d){return d===Va?f.mapping=ts:d===Ga&&(f.mapping=zs),f}function l(f){let d=0;const g=6;for(let v=0;v<g;v++)f[v]!==void 0&&d++;return d===g}function c(f){const d=f.target;d.removeEventListener("dispose",c);const g=e.get(d);g!==void 0&&(e.delete(d),g.dispose())}function h(f){const d=f.target;d.removeEventListener("dispose",h);const g=t.get(d);g!==void 0&&(t.delete(d),g.dispose())}function u(){e=new WeakMap,t=new WeakMap,n!==null&&(n.dispose(),n=null)}return{get:s,dispose:u}}function f0(i){const e={};function t(n){if(e[n]!==void 0)return e[n];const s=i.getExtension(n);return e[n]=s,s}return{has:function(n){return t(n)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(n){const s=t(n);return s===null&&Sa("WebGLRenderer: "+n+" extension not supported."),s}}}function u0(i,e,t,n){const s={},r=new WeakMap;function a(u){const f=u.target;f.index!==null&&e.remove(f.index);for(const g in f.attributes)e.remove(f.attributes[g]);f.removeEventListener("dispose",a),delete s[f.id];const d=r.get(f);d&&(e.remove(d),r.delete(f)),n.releaseStatesOfGeometry(f),f.isInstancedBufferGeometry===!0&&delete f._maxInstanceCount,t.memory.geometries--}function o(u,f){return s[f.id]===!0||(f.addEventListener("dispose",a),s[f.id]=!0,t.memory.geometries++),f}function l(u){const f=u.attributes;for(const d in f)e.update(f[d],i.ARRAY_BUFFER)}function c(u){const f=[],d=u.index,g=u.attributes.position;let v=0;if(g===void 0)return;if(d!==null){const y=d.array;v=d.version;for(let w=0,M=y.length;w<M;w+=3){const D=y[w+0],R=y[w+1],L=y[w+2];f.push(D,R,R,L,L,D)}}else{const y=g.array;v=g.version;for(let w=0,M=y.length/3-1;w<M;w+=3){const D=w+0,R=w+1,L=w+2;f.push(D,R,R,L,L,D)}}const m=new(g.count>=65535?Lf:If)(f,1);m.version=v;const p=r.get(u);p&&e.remove(p),r.set(u,m)}function h(u){const f=r.get(u);if(f){const d=u.index;d!==null&&f.version<d.version&&c(u)}else c(u);return r.get(u)}return{get:o,update:l,getWireframeAttribute:h}}function d0(i,e,t){let n;function s(f){n=f}let r,a;function o(f){r=f.type,a=f.bytesPerElement}function l(f,d){i.drawElements(n,d,r,f*a),t.update(d,n,1)}function c(f,d,g){g!==0&&(i.drawElementsInstanced(n,d,r,f*a,g),t.update(d,n,g))}function h(f,d,g){if(g===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,d,0,r,f,0,g);let m=0;for(let p=0;p<g;p++)m+=d[p];t.update(m,n,1)}function u(f,d,g,v){if(g===0)return;const m=e.get("WEBGL_multi_draw");if(m===null)for(let p=0;p<f.length;p++)c(f[p]/a,d[p],v[p]);else{m.multiDrawElementsInstancedWEBGL(n,d,0,r,f,0,v,0,g);let p=0;for(let y=0;y<g;y++)p+=d[y]*v[y];t.update(p,n,1)}}this.setMode=s,this.setIndex=o,this.render=l,this.renderInstances=c,this.renderMultiDraw=h,this.renderMultiDrawInstances=u}function p0(i){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,a,o){switch(t.calls++,a){case i.TRIANGLES:t.triangles+=o*(r/3);break;case i.LINES:t.lines+=o*(r/2);break;case i.LINE_STRIP:t.lines+=o*(r-1);break;case i.LINE_LOOP:t.lines+=o*r;break;case i.POINTS:t.points+=o*r;break;default:Je("WebGLInfo: Unknown draw mode:",a);break}}function s(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:s,update:n}}function m0(i,e,t){const n=new WeakMap,s=new Tt;function r(a,o,l){const c=a.morphTargetInfluences,h=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,u=h!==void 0?h.length:0;let f=n.get(o);if(f===void 0||f.count!==u){let X=function(){x.dispose(),n.delete(o),o.removeEventListener("dispose",X)};var d=X;f!==void 0&&f.texture.dispose();const g=o.morphAttributes.position!==void 0,v=o.morphAttributes.normal!==void 0,m=o.morphAttributes.color!==void 0,p=o.morphAttributes.position||[],y=o.morphAttributes.normal||[],w=o.morphAttributes.color||[];let M=0;g===!0&&(M=1),v===!0&&(M=2),m===!0&&(M=3);let D=o.attributes.position.count*M,R=1;D>e.maxTextureSize&&(R=Math.ceil(D/e.maxTextureSize),D=e.maxTextureSize);const L=new Float32Array(D*R*4*u),x=new Rf(L,D,R,u);x.type=$n,x.needsUpdate=!0;const E=M*4;for(let I=0;I<u;I++){const G=p[I],b=y[I],U=w[I],C=D*R*4*I;for(let P=0;P<G.count;P++){const A=P*E;g===!0&&(s.fromBufferAttribute(G,P),L[C+A+0]=s.x,L[C+A+1]=s.y,L[C+A+2]=s.z,L[C+A+3]=0),v===!0&&(s.fromBufferAttribute(b,P),L[C+A+4]=s.x,L[C+A+5]=s.y,L[C+A+6]=s.z,L[C+A+7]=0),m===!0&&(s.fromBufferAttribute(U,P),L[C+A+8]=s.x,L[C+A+9]=s.y,L[C+A+10]=s.z,L[C+A+11]=U.itemSize===4?s.w:1)}}f={count:u,texture:x,size:new Le(D,R)},n.set(o,f),o.addEventListener("dispose",X)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)l.getUniforms().setValue(i,"morphTexture",a.morphTexture,t);else{let g=0;for(let m=0;m<c.length;m++)g+=c[m];const v=o.morphTargetsRelative?1:1-g;l.getUniforms().setValue(i,"morphTargetBaseInfluence",v),l.getUniforms().setValue(i,"morphTargetInfluences",c)}l.getUniforms().setValue(i,"morphTargetsTexture",f.texture,t),l.getUniforms().setValue(i,"morphTargetsTextureSize",f.size)}return{update:r}}function g0(i,e,t,n,s){let r=new WeakMap;function a(c){const h=s.render.frame,u=c.geometry,f=e.get(c,u);if(r.get(f)!==h&&(e.update(f),r.set(f,h)),c.isInstancedMesh&&(c.hasEventListener("dispose",l)===!1&&c.addEventListener("dispose",l),r.get(c)!==h&&(t.update(c.instanceMatrix,i.ARRAY_BUFFER),c.instanceColor!==null&&t.update(c.instanceColor,i.ARRAY_BUFFER),r.set(c,h))),c.isSkinnedMesh){const d=c.skeleton;r.get(d)!==h&&(d.update(),r.set(d,h))}return f}function o(){r=new WeakMap}function l(c){const h=c.target;h.removeEventListener("dispose",l),n.releaseStatesOfObject(h),t.remove(h.instanceMatrix),h.instanceColor!==null&&t.remove(h.instanceColor)}return{update:a,dispose:o}}const _0={[uf]:"LINEAR_TONE_MAPPING",[df]:"REINHARD_TONE_MAPPING",[pf]:"CINEON_TONE_MAPPING",[mf]:"ACES_FILMIC_TONE_MAPPING",[_f]:"AGX_TONE_MAPPING",[xf]:"NEUTRAL_TONE_MAPPING",[gf]:"CUSTOM_TONE_MAPPING"};function x0(i,e,t,n,s){const r=new jn(e,t,{type:i,depthBuffer:n,stencilBuffer:s}),a=new jn(e,t,{type:_i,depthBuffer:!1,stencilBuffer:!1}),o=new Yt;o.setAttribute("position",new Lt([-1,3,0,-1,-1,0,3,-1,0],3)),o.setAttribute("uv",new Lt([0,2,0,0,2,0],2));const l=new op({uniforms:{tDiffuse:{value:null}},vertexShader:`
			precision highp float;

			uniform mat4 modelViewMatrix;
			uniform mat4 projectionMatrix;

			attribute vec3 position;
			attribute vec2 uv;

			varying vec2 vUv;

			void main() {
				vUv = uv;
				gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
			}`,fragmentShader:`
			precision highp float;

			uniform sampler2D tDiffuse;

			varying vec2 vUv;

			#include <tonemapping_pars_fragment>
			#include <colorspace_pars_fragment>

			void main() {
				gl_FragColor = texture2D( tDiffuse, vUv );

				#ifdef LINEAR_TONE_MAPPING
					gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );
				#elif defined( REINHARD_TONE_MAPPING )
					gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );
				#elif defined( CINEON_TONE_MAPPING )
					gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );
				#elif defined( ACES_FILMIC_TONE_MAPPING )
					gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );
				#elif defined( AGX_TONE_MAPPING )
					gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );
				#elif defined( NEUTRAL_TONE_MAPPING )
					gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );
				#elif defined( CUSTOM_TONE_MAPPING )
					gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );
				#endif

				#ifdef SRGB_TRANSFER
					gl_FragColor = sRGBTransferOETF( gl_FragColor );
				#endif
			}`,depthTest:!1,depthWrite:!1}),c=new Ie(o,l),h=new Ql(-1,1,1,-1,0,1);let u=null,f=null,d=!1,g,v=null,m=[],p=!1;this.setSize=function(y,w){r.setSize(y,w),a.setSize(y,w);for(let M=0;M<m.length;M++){const D=m[M];D.setSize&&D.setSize(y,w)}},this.setEffects=function(y){m=y,p=m.length>0&&m[0].isRenderPass===!0;const w=r.width,M=r.height;for(let D=0;D<m.length;D++){const R=m[D];R.setSize&&R.setSize(w,M)}},this.begin=function(y,w){if(d||y.toneMapping===qn&&m.length===0)return!1;if(v=w,w!==null){const M=w.width,D=w.height;(r.width!==M||r.height!==D)&&this.setSize(M,D)}return p===!1&&y.setRenderTarget(r),g=y.toneMapping,y.toneMapping=qn,!0},this.hasRenderPass=function(){return p},this.end=function(y,w){y.toneMapping=g,d=!0;let M=r,D=a;for(let R=0;R<m.length;R++){const L=m[R];if(L.enabled!==!1&&(L.render(y,D,M,w),L.needsSwap!==!1)){const x=M;M=D,D=x}}if(u!==y.outputColorSpace||f!==y.toneMapping){u=y.outputColorSpace,f=y.toneMapping,l.defines={},et.getTransfer(u)===at&&(l.defines.SRGB_TRANSFER="");const R=_0[f];R&&(l.defines[R]=""),l.needsUpdate=!0}l.uniforms.tDiffuse.value=M.texture,y.setRenderTarget(v),y.render(c,h),v=null,d=!1},this.isCompositing=function(){return d},this.dispose=function(){r.dispose(),a.dispose(),o.dispose(),l.dispose()}}const $f=new nn,Ml=new _r(1,1),Yf=new Rf,qf=new Od,jf=new Of,vh=[],yh=[],Sh=new Float32Array(16),Mh=new Float32Array(9),Eh=new Float32Array(4);function qs(i,e,t){const n=i[0];if(n<=0||n>0)return i;const s=e*t;let r=vh[s];if(r===void 0&&(r=new Float32Array(s),vh[s]=r),e!==0){n.toArray(r,0);for(let a=1,o=0;a!==e;++a)o+=t,i[a].toArray(r,o)}return r}function Bt(i,e){if(i.length!==e.length)return!1;for(let t=0,n=i.length;t<n;t++)if(i[t]!==e[t])return!1;return!0}function zt(i,e){for(let t=0,n=e.length;t<n;t++)i[t]=e[t]}function Da(i,e){let t=yh[e];t===void 0&&(t=new Int32Array(e),yh[e]=t);for(let n=0;n!==e;++n)t[n]=i.allocateTextureUnit();return t}function v0(i,e){const t=this.cache;t[0]!==e&&(i.uniform1f(this.addr,e),t[0]=e)}function y0(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Bt(t,e))return;i.uniform2fv(this.addr,e),zt(t,e)}}function S0(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(i.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(Bt(t,e))return;i.uniform3fv(this.addr,e),zt(t,e)}}function M0(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Bt(t,e))return;i.uniform4fv(this.addr,e),zt(t,e)}}function E0(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(Bt(t,e))return;i.uniformMatrix2fv(this.addr,!1,e),zt(t,e)}else{if(Bt(t,n))return;Eh.set(n),i.uniformMatrix2fv(this.addr,!1,Eh),zt(t,n)}}function b0(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(Bt(t,e))return;i.uniformMatrix3fv(this.addr,!1,e),zt(t,e)}else{if(Bt(t,n))return;Mh.set(n),i.uniformMatrix3fv(this.addr,!1,Mh),zt(t,n)}}function w0(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(Bt(t,e))return;i.uniformMatrix4fv(this.addr,!1,e),zt(t,e)}else{if(Bt(t,n))return;Sh.set(n),i.uniformMatrix4fv(this.addr,!1,Sh),zt(t,n)}}function T0(i,e){const t=this.cache;t[0]!==e&&(i.uniform1i(this.addr,e),t[0]=e)}function A0(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Bt(t,e))return;i.uniform2iv(this.addr,e),zt(t,e)}}function C0(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Bt(t,e))return;i.uniform3iv(this.addr,e),zt(t,e)}}function R0(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Bt(t,e))return;i.uniform4iv(this.addr,e),zt(t,e)}}function P0(i,e){const t=this.cache;t[0]!==e&&(i.uniform1ui(this.addr,e),t[0]=e)}function D0(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Bt(t,e))return;i.uniform2uiv(this.addr,e),zt(t,e)}}function I0(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Bt(t,e))return;i.uniform3uiv(this.addr,e),zt(t,e)}}function L0(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Bt(t,e))return;i.uniform4uiv(this.addr,e),zt(t,e)}}function U0(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s);let r;this.type===i.SAMPLER_2D_SHADOW?(Ml.compareFunction=t.isReversedDepthBuffer()?Wl:Hl,r=Ml):r=$f,t.setTexture2D(e||r,s)}function N0(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTexture3D(e||qf,s)}function F0(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTextureCube(e||jf,s)}function O0(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTexture2DArray(e||Yf,s)}function B0(i){switch(i){case 5126:return v0;case 35664:return y0;case 35665:return S0;case 35666:return M0;case 35674:return E0;case 35675:return b0;case 35676:return w0;case 5124:case 35670:return T0;case 35667:case 35671:return A0;case 35668:case 35672:return C0;case 35669:case 35673:return R0;case 5125:return P0;case 36294:return D0;case 36295:return I0;case 36296:return L0;case 35678:case 36198:case 36298:case 36306:case 35682:return U0;case 35679:case 36299:case 36307:return N0;case 35680:case 36300:case 36308:case 36293:return F0;case 36289:case 36303:case 36311:case 36292:return O0}}function z0(i,e){i.uniform1fv(this.addr,e)}function k0(i,e){const t=qs(e,this.size,2);i.uniform2fv(this.addr,t)}function V0(i,e){const t=qs(e,this.size,3);i.uniform3fv(this.addr,t)}function G0(i,e){const t=qs(e,this.size,4);i.uniform4fv(this.addr,t)}function H0(i,e){const t=qs(e,this.size,4);i.uniformMatrix2fv(this.addr,!1,t)}function W0(i,e){const t=qs(e,this.size,9);i.uniformMatrix3fv(this.addr,!1,t)}function X0(i,e){const t=qs(e,this.size,16);i.uniformMatrix4fv(this.addr,!1,t)}function $0(i,e){i.uniform1iv(this.addr,e)}function Y0(i,e){i.uniform2iv(this.addr,e)}function q0(i,e){i.uniform3iv(this.addr,e)}function j0(i,e){i.uniform4iv(this.addr,e)}function Z0(i,e){i.uniform1uiv(this.addr,e)}function K0(i,e){i.uniform2uiv(this.addr,e)}function J0(i,e){i.uniform3uiv(this.addr,e)}function Q0(i,e){i.uniform4uiv(this.addr,e)}function e_(i,e,t){const n=this.cache,s=e.length,r=Da(t,s);Bt(n,r)||(i.uniform1iv(this.addr,r),zt(n,r));let a;this.type===i.SAMPLER_2D_SHADOW?a=Ml:a=$f;for(let o=0;o!==s;++o)t.setTexture2D(e[o]||a,r[o])}function t_(i,e,t){const n=this.cache,s=e.length,r=Da(t,s);Bt(n,r)||(i.uniform1iv(this.addr,r),zt(n,r));for(let a=0;a!==s;++a)t.setTexture3D(e[a]||qf,r[a])}function n_(i,e,t){const n=this.cache,s=e.length,r=Da(t,s);Bt(n,r)||(i.uniform1iv(this.addr,r),zt(n,r));for(let a=0;a!==s;++a)t.setTextureCube(e[a]||jf,r[a])}function i_(i,e,t){const n=this.cache,s=e.length,r=Da(t,s);Bt(n,r)||(i.uniform1iv(this.addr,r),zt(n,r));for(let a=0;a!==s;++a)t.setTexture2DArray(e[a]||Yf,r[a])}function s_(i){switch(i){case 5126:return z0;case 35664:return k0;case 35665:return V0;case 35666:return G0;case 35674:return H0;case 35675:return W0;case 35676:return X0;case 5124:case 35670:return $0;case 35667:case 35671:return Y0;case 35668:case 35672:return q0;case 35669:case 35673:return j0;case 5125:return Z0;case 36294:return K0;case 36295:return J0;case 36296:return Q0;case 35678:case 36198:case 36298:case 36306:case 35682:return e_;case 35679:case 36299:case 36307:return t_;case 35680:case 36300:case 36308:case 36293:return n_;case 36289:case 36303:case 36311:case 36292:return i_}}class r_{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=B0(t.type)}}class a_{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=s_(t.type)}}class o_{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){const s=this.seq;for(let r=0,a=s.length;r!==a;++r){const o=s[r];o.setValue(e,t[o.id],n)}}}const So=/(\w+)(\])?(\[|\.)?/g;function bh(i,e){i.seq.push(e),i.map[e.id]=e}function l_(i,e,t){const n=i.name,s=n.length;for(So.lastIndex=0;;){const r=So.exec(n),a=So.lastIndex;let o=r[1];const l=r[2]==="]",c=r[3];if(l&&(o=o|0),c===void 0||c==="["&&a+2===s){bh(t,c===void 0?new r_(o,i,e):new a_(o,i,e));break}else{let u=t.map[o];u===void 0&&(u=new o_(o),bh(t,u)),t=u}}}class pa{constructor(e,t){this.seq=[],this.map={};const n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let a=0;a<n;++a){const o=e.getActiveUniform(t,a),l=e.getUniformLocation(t,o.name);l_(o,l,this)}const s=[],r=[];for(const a of this.seq)a.type===e.SAMPLER_2D_SHADOW||a.type===e.SAMPLER_CUBE_SHADOW||a.type===e.SAMPLER_2D_ARRAY_SHADOW?s.push(a):r.push(a);s.length>0&&(this.seq=s.concat(r))}setValue(e,t,n,s){const r=this.map[t];r!==void 0&&r.setValue(e,n,s)}setOptional(e,t,n){const s=t[n];s!==void 0&&this.setValue(e,n,s)}static upload(e,t,n,s){for(let r=0,a=t.length;r!==a;++r){const o=t[r],l=n[o.id];l.needsUpdate!==!1&&o.setValue(e,l.value,s)}}static seqWithValue(e,t){const n=[];for(let s=0,r=e.length;s!==r;++s){const a=e[s];a.id in t&&n.push(a)}return n}}function wh(i,e,t){const n=i.createShader(e);return i.shaderSource(n,t),i.compileShader(n),n}const c_=37297;let h_=0;function f_(i,e){const t=i.split(`
`),n=[],s=Math.max(e-6,0),r=Math.min(e+6,t.length);for(let a=s;a<r;a++){const o=a+1;n.push(`${o===e?">":" "} ${o}: ${t[a]}`)}return n.join(`
`)}const Th=new Ve;function u_(i){et._getMatrix(Th,et.workingColorSpace,i);const e=`mat3( ${Th.elements.map(t=>t.toFixed(4))} )`;switch(et.getTransfer(i)){case xa:return[e,"LinearTransferOETF"];case at:return[e,"sRGBTransferOETF"];default:return Fe("WebGLProgram: Unsupported color space: ",i),[e,"LinearTransferOETF"]}}function Ah(i,e,t){const n=i.getShaderParameter(e,i.COMPILE_STATUS),r=(i.getShaderInfoLog(e)||"").trim();if(n&&r==="")return"";const a=/ERROR: 0:(\d+)/.exec(r);if(a){const o=parseInt(a[1]);return t.toUpperCase()+`

`+r+`

`+f_(i.getShaderSource(e),o)}else return r}function d_(i,e){const t=u_(e);return[`vec4 ${i}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}const p_={[uf]:"Linear",[df]:"Reinhard",[pf]:"Cineon",[mf]:"ACESFilmic",[_f]:"AgX",[xf]:"Neutral",[gf]:"Custom"};function m_(i,e){const t=p_[e];return t===void 0?(Fe("WebGLProgram: Unsupported toneMapping:",e),"vec3 "+i+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+i+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}const sa=new O;function g_(){et.getLuminanceCoefficients(sa);const i=sa.x.toFixed(4),e=sa.y.toFixed(4),t=sa.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function __(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(lr).join(`
`)}function x_(i){const e=[];for(const t in i){const n=i[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function v_(i,e){const t={},n=i.getProgramParameter(e,i.ACTIVE_ATTRIBUTES);for(let s=0;s<n;s++){const r=i.getActiveAttrib(e,s),a=r.name;let o=1;r.type===i.FLOAT_MAT2&&(o=2),r.type===i.FLOAT_MAT3&&(o=3),r.type===i.FLOAT_MAT4&&(o=4),t[a]={type:r.type,location:i.getAttribLocation(e,a),locationSize:o}}return t}function lr(i){return i!==""}function Ch(i,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return i.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function Rh(i,e){return i.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const y_=/^[ \t]*#include +<([\w\d./]+)>/gm;function El(i){return i.replace(y_,M_)}const S_=new Map;function M_(i,e){let t=Ge[e];if(t===void 0){const n=S_.get(e);if(n!==void 0)t=Ge[n],Fe('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,n);else throw new Error("Can not resolve #include <"+e+">")}return El(t)}const E_=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Ph(i){return i.replace(E_,b_)}function b_(i,e,t,n){let s="";for(let r=parseInt(e);r<parseInt(t);r++)s+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function Dh(i){let e=`precision ${i.precision} float;
	precision ${i.precision} int;
	precision ${i.precision} sampler2D;
	precision ${i.precision} samplerCube;
	precision ${i.precision} sampler3D;
	precision ${i.precision} sampler2DArray;
	precision ${i.precision} sampler2DShadow;
	precision ${i.precision} samplerCubeShadow;
	precision ${i.precision} sampler2DArrayShadow;
	precision ${i.precision} isampler2D;
	precision ${i.precision} isampler3D;
	precision ${i.precision} isamplerCube;
	precision ${i.precision} isampler2DArray;
	precision ${i.precision} usampler2D;
	precision ${i.precision} usampler3D;
	precision ${i.precision} usamplerCube;
	precision ${i.precision} usampler2DArray;
	`;return i.precision==="highp"?e+=`
#define HIGH_PRECISION`:i.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:i.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}const w_={[cr]:"SHADOWMAP_TYPE_PCF",[or]:"SHADOWMAP_TYPE_VSM"};function T_(i){return w_[i.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}const A_={[ts]:"ENVMAP_TYPE_CUBE",[zs]:"ENVMAP_TYPE_CUBE",[Ra]:"ENVMAP_TYPE_CUBE_UV"};function C_(i){return i.envMap===!1?"ENVMAP_TYPE_CUBE":A_[i.envMapMode]||"ENVMAP_TYPE_CUBE"}const R_={[zs]:"ENVMAP_MODE_REFRACTION"};function P_(i){return i.envMap===!1?"ENVMAP_MODE_REFLECTION":R_[i.envMapMode]||"ENVMAP_MODE_REFLECTION"}const D_={[ff]:"ENVMAP_BLENDING_MULTIPLY",[md]:"ENVMAP_BLENDING_MIX",[gd]:"ENVMAP_BLENDING_ADD"};function I_(i){return i.envMap===!1?"ENVMAP_BLENDING_NONE":D_[i.combine]||"ENVMAP_BLENDING_NONE"}function L_(i){const e=i.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,n=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),112)),texelHeight:n,maxMip:t}}function U_(i,e,t,n){const s=i.getContext(),r=t.defines;let a=t.vertexShader,o=t.fragmentShader;const l=T_(t),c=C_(t),h=P_(t),u=I_(t),f=L_(t),d=__(t),g=x_(r),v=s.createProgram();let m,p,y=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(m=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(lr).join(`
`),m.length>0&&(m+=`
`),p=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(lr).join(`
`),p.length>0&&(p+=`
`)):(m=[Dh(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+h:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(lr).join(`
`),p=[Dh(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+c:"",t.envMap?"#define "+h:"",t.envMap?"#define "+u:"",f?"#define CUBEUV_TEXEL_WIDTH "+f.texelWidth:"",f?"#define CUBEUV_TEXEL_HEIGHT "+f.texelHeight:"",f?"#define CUBEUV_MAX_MIP "+f.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas||t.batchingColor?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==qn?"#define TONE_MAPPING":"",t.toneMapping!==qn?Ge.tonemapping_pars_fragment:"",t.toneMapping!==qn?m_("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",Ge.colorspace_pars_fragment,d_("linearToOutputTexel",t.outputColorSpace),g_(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(lr).join(`
`)),a=El(a),a=Ch(a,t),a=Rh(a,t),o=El(o),o=Ch(o,t),o=Rh(o,t),a=Ph(a),o=Ph(o),t.isRawShaderMaterial!==!0&&(y=`#version 300 es
`,m=[d,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,p=["#define varying in",t.glslVersion===Uc?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===Uc?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+p);const w=y+m+a,M=y+p+o,D=wh(s,s.VERTEX_SHADER,w),R=wh(s,s.FRAGMENT_SHADER,M);s.attachShader(v,D),s.attachShader(v,R),t.index0AttributeName!==void 0?s.bindAttribLocation(v,0,t.index0AttributeName):t.morphTargets===!0&&s.bindAttribLocation(v,0,"position"),s.linkProgram(v);function L(I){if(i.debug.checkShaderErrors){const G=s.getProgramInfoLog(v)||"",b=s.getShaderInfoLog(D)||"",U=s.getShaderInfoLog(R)||"",C=G.trim(),P=b.trim(),A=U.trim();let q=!0,j=!0;if(s.getProgramParameter(v,s.LINK_STATUS)===!1)if(q=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(s,v,D,R);else{const ee=Ah(s,D,"vertex"),se=Ah(s,R,"fragment");Je("THREE.WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(v,s.VALIDATE_STATUS)+`

Material Name: `+I.name+`
Material Type: `+I.type+`

Program Info Log: `+C+`
`+ee+`
`+se)}else C!==""?Fe("WebGLProgram: Program Info Log:",C):(P===""||A==="")&&(j=!1);j&&(I.diagnostics={runnable:q,programLog:C,vertexShader:{log:P,prefix:m},fragmentShader:{log:A,prefix:p}})}s.deleteShader(D),s.deleteShader(R),x=new pa(s,v),E=v_(s,v)}let x;this.getUniforms=function(){return x===void 0&&L(this),x};let E;this.getAttributes=function(){return E===void 0&&L(this),E};let X=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return X===!1&&(X=s.getProgramParameter(v,c_)),X},this.destroy=function(){n.releaseStatesOfProgram(this),s.deleteProgram(v),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=h_++,this.cacheKey=e,this.usedTimes=1,this.program=v,this.vertexShader=D,this.fragmentShader=R,this}let N_=0;class F_{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const t=e.vertexShader,n=e.fragmentShader,s=this._getShaderStage(t),r=this._getShaderStage(n),a=this._getShaderCacheForMaterial(e);return a.has(s)===!1&&(a.add(s),s.usedTimes++),a.has(r)===!1&&(a.add(r),r.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){const t=this.shaderCache;let n=t.get(e);return n===void 0&&(n=new O_(e),t.set(e,n)),n}}class O_{constructor(e){this.id=N_++,this.code=e,this.usedTimes=0}}function B_(i,e,t,n,s,r){const a=new $l,o=new F_,l=new Set,c=[],h=new Map,u=n.logarithmicDepthBuffer;let f=n.precision;const d={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function g(x){return l.add(x),x===0?"uv":`uv${x}`}function v(x,E,X,I,G){const b=I.fog,U=G.geometry,C=x.isMeshStandardMaterial||x.isMeshLambertMaterial||x.isMeshPhongMaterial?I.environment:null,P=x.isMeshStandardMaterial||x.isMeshLambertMaterial&&!x.envMap||x.isMeshPhongMaterial&&!x.envMap,A=e.get(x.envMap||C,P),q=A&&A.mapping===Ra?A.image.height:null,j=d[x.type];x.precision!==null&&(f=n.getMaxPrecision(x.precision),f!==x.precision&&Fe("WebGLProgram.getParameters:",x.precision,"not supported, using",f,"instead."));const ee=U.morphAttributes.position||U.morphAttributes.normal||U.morphAttributes.color,se=ee!==void 0?ee.length:0;let ie=0;U.morphAttributes.position!==void 0&&(ie=1),U.morphAttributes.normal!==void 0&&(ie=2),U.morphAttributes.color!==void 0&&(ie=3);let Pe,qe,Ke,J;if(j){const rt=Gn[j];Pe=rt.vertexShader,qe=rt.fragmentShader}else Pe=x.vertexShader,qe=x.fragmentShader,o.update(x),Ke=o.getVertexShaderID(x),J=o.getFragmentShaderID(x);const ae=i.getRenderTarget(),ue=i.state.buffers.depth.getReversed(),ke=G.isInstancedMesh===!0,Ue=G.isBatchedMesh===!0,Oe=!!x.map,kt=!!x.matcap,Qe=!!A,st=!!x.aoMap,ut=!!x.lightMap,We=!!x.bumpMap,At=!!x.normalMap,N=!!x.displacementMap,Ut=!!x.emissiveMap,it=!!x.metalnessMap,pt=!!x.roughnessMap,Te=x.anisotropy>0,T=x.clearcoat>0,_=x.dispersion>0,B=x.iridescence>0,Q=x.sheen>0,te=x.transmission>0,K=Te&&!!x.anisotropyMap,Se=T&&!!x.clearcoatMap,he=T&&!!x.clearcoatNormalMap,De=T&&!!x.clearcoatRoughnessMap,Ne=B&&!!x.iridescenceMap,re=B&&!!x.iridescenceThicknessMap,le=Q&&!!x.sheenColorMap,Me=Q&&!!x.sheenRoughnessMap,be=!!x.specularMap,xe=!!x.specularColorMap,Xe=!!x.specularIntensityMap,F=te&&!!x.transmissionMap,fe=te&&!!x.thicknessMap,ce=!!x.gradientMap,ye=!!x.alphaMap,oe=x.alphaTest>0,Z=!!x.alphaHash,Ee=!!x.extensions;let Be=qn;x.toneMapped&&(ae===null||ae.isXRRenderTarget===!0)&&(Be=i.toneMapping);const mt={shaderID:j,shaderType:x.type,shaderName:x.name,vertexShader:Pe,fragmentShader:qe,defines:x.defines,customVertexShaderID:Ke,customFragmentShaderID:J,isRawShaderMaterial:x.isRawShaderMaterial===!0,glslVersion:x.glslVersion,precision:f,batching:Ue,batchingColor:Ue&&G._colorsTexture!==null,instancing:ke,instancingColor:ke&&G.instanceColor!==null,instancingMorph:ke&&G.morphTexture!==null,outputColorSpace:ae===null?i.outputColorSpace:ae.isXRRenderTarget===!0?ae.texture.colorSpace:Vs,alphaToCoverage:!!x.alphaToCoverage,map:Oe,matcap:kt,envMap:Qe,envMapMode:Qe&&A.mapping,envMapCubeUVHeight:q,aoMap:st,lightMap:ut,bumpMap:We,normalMap:At,displacementMap:N,emissiveMap:Ut,normalMapObjectSpace:At&&x.normalMapType===vd,normalMapTangentSpace:At&&x.normalMapType===Af,metalnessMap:it,roughnessMap:pt,anisotropy:Te,anisotropyMap:K,clearcoat:T,clearcoatMap:Se,clearcoatNormalMap:he,clearcoatRoughnessMap:De,dispersion:_,iridescence:B,iridescenceMap:Ne,iridescenceThicknessMap:re,sheen:Q,sheenColorMap:le,sheenRoughnessMap:Me,specularMap:be,specularColorMap:xe,specularIntensityMap:Xe,transmission:te,transmissionMap:F,thicknessMap:fe,gradientMap:ce,opaque:x.transparent===!1&&x.blending===Us&&x.alphaToCoverage===!1,alphaMap:ye,alphaTest:oe,alphaHash:Z,combine:x.combine,mapUv:Oe&&g(x.map.channel),aoMapUv:st&&g(x.aoMap.channel),lightMapUv:ut&&g(x.lightMap.channel),bumpMapUv:We&&g(x.bumpMap.channel),normalMapUv:At&&g(x.normalMap.channel),displacementMapUv:N&&g(x.displacementMap.channel),emissiveMapUv:Ut&&g(x.emissiveMap.channel),metalnessMapUv:it&&g(x.metalnessMap.channel),roughnessMapUv:pt&&g(x.roughnessMap.channel),anisotropyMapUv:K&&g(x.anisotropyMap.channel),clearcoatMapUv:Se&&g(x.clearcoatMap.channel),clearcoatNormalMapUv:he&&g(x.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:De&&g(x.clearcoatRoughnessMap.channel),iridescenceMapUv:Ne&&g(x.iridescenceMap.channel),iridescenceThicknessMapUv:re&&g(x.iridescenceThicknessMap.channel),sheenColorMapUv:le&&g(x.sheenColorMap.channel),sheenRoughnessMapUv:Me&&g(x.sheenRoughnessMap.channel),specularMapUv:be&&g(x.specularMap.channel),specularColorMapUv:xe&&g(x.specularColorMap.channel),specularIntensityMapUv:Xe&&g(x.specularIntensityMap.channel),transmissionMapUv:F&&g(x.transmissionMap.channel),thicknessMapUv:fe&&g(x.thicknessMap.channel),alphaMapUv:ye&&g(x.alphaMap.channel),vertexTangents:!!U.attributes.tangent&&(At||Te),vertexColors:x.vertexColors,vertexAlphas:x.vertexColors===!0&&!!U.attributes.color&&U.attributes.color.itemSize===4,pointsUvs:G.isPoints===!0&&!!U.attributes.uv&&(Oe||ye),fog:!!b,useFog:x.fog===!0,fogExp2:!!b&&b.isFogExp2,flatShading:x.wireframe===!1&&(x.flatShading===!0||U.attributes.normal===void 0&&At===!1&&(x.isMeshLambertMaterial||x.isMeshPhongMaterial||x.isMeshStandardMaterial||x.isMeshPhysicalMaterial)),sizeAttenuation:x.sizeAttenuation===!0,logarithmicDepthBuffer:u,reversedDepthBuffer:ue,skinning:G.isSkinnedMesh===!0,morphTargets:U.morphAttributes.position!==void 0,morphNormals:U.morphAttributes.normal!==void 0,morphColors:U.morphAttributes.color!==void 0,morphTargetsCount:se,morphTextureStride:ie,numDirLights:E.directional.length,numPointLights:E.point.length,numSpotLights:E.spot.length,numSpotLightMaps:E.spotLightMap.length,numRectAreaLights:E.rectArea.length,numHemiLights:E.hemi.length,numDirLightShadows:E.directionalShadowMap.length,numPointLightShadows:E.pointShadowMap.length,numSpotLightShadows:E.spotShadowMap.length,numSpotLightShadowsWithMaps:E.numSpotLightShadowsWithMaps,numLightProbes:E.numLightProbes,numClippingPlanes:r.numPlanes,numClipIntersection:r.numIntersection,dithering:x.dithering,shadowMapEnabled:i.shadowMap.enabled&&X.length>0,shadowMapType:i.shadowMap.type,toneMapping:Be,decodeVideoTexture:Oe&&x.map.isVideoTexture===!0&&et.getTransfer(x.map.colorSpace)===at,decodeVideoTextureEmissive:Ut&&x.emissiveMap.isVideoTexture===!0&&et.getTransfer(x.emissiveMap.colorSpace)===at,premultipliedAlpha:x.premultipliedAlpha,doubleSided:x.side===Hn,flipSided:x.side===un,useDepthPacking:x.depthPacking>=0,depthPacking:x.depthPacking||0,index0AttributeName:x.index0AttributeName,extensionClipCullDistance:Ee&&x.extensions.clipCullDistance===!0&&t.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Ee&&x.extensions.multiDraw===!0||Ue)&&t.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:t.has("KHR_parallel_shader_compile"),customProgramCacheKey:x.customProgramCacheKey()};return mt.vertexUv1s=l.has(1),mt.vertexUv2s=l.has(2),mt.vertexUv3s=l.has(3),l.clear(),mt}function m(x){const E=[];if(x.shaderID?E.push(x.shaderID):(E.push(x.customVertexShaderID),E.push(x.customFragmentShaderID)),x.defines!==void 0)for(const X in x.defines)E.push(X),E.push(x.defines[X]);return x.isRawShaderMaterial===!1&&(p(E,x),y(E,x),E.push(i.outputColorSpace)),E.push(x.customProgramCacheKey),E.join()}function p(x,E){x.push(E.precision),x.push(E.outputColorSpace),x.push(E.envMapMode),x.push(E.envMapCubeUVHeight),x.push(E.mapUv),x.push(E.alphaMapUv),x.push(E.lightMapUv),x.push(E.aoMapUv),x.push(E.bumpMapUv),x.push(E.normalMapUv),x.push(E.displacementMapUv),x.push(E.emissiveMapUv),x.push(E.metalnessMapUv),x.push(E.roughnessMapUv),x.push(E.anisotropyMapUv),x.push(E.clearcoatMapUv),x.push(E.clearcoatNormalMapUv),x.push(E.clearcoatRoughnessMapUv),x.push(E.iridescenceMapUv),x.push(E.iridescenceThicknessMapUv),x.push(E.sheenColorMapUv),x.push(E.sheenRoughnessMapUv),x.push(E.specularMapUv),x.push(E.specularColorMapUv),x.push(E.specularIntensityMapUv),x.push(E.transmissionMapUv),x.push(E.thicknessMapUv),x.push(E.combine),x.push(E.fogExp2),x.push(E.sizeAttenuation),x.push(E.morphTargetsCount),x.push(E.morphAttributeCount),x.push(E.numDirLights),x.push(E.numPointLights),x.push(E.numSpotLights),x.push(E.numSpotLightMaps),x.push(E.numHemiLights),x.push(E.numRectAreaLights),x.push(E.numDirLightShadows),x.push(E.numPointLightShadows),x.push(E.numSpotLightShadows),x.push(E.numSpotLightShadowsWithMaps),x.push(E.numLightProbes),x.push(E.shadowMapType),x.push(E.toneMapping),x.push(E.numClippingPlanes),x.push(E.numClipIntersection),x.push(E.depthPacking)}function y(x,E){a.disableAll(),E.instancing&&a.enable(0),E.instancingColor&&a.enable(1),E.instancingMorph&&a.enable(2),E.matcap&&a.enable(3),E.envMap&&a.enable(4),E.normalMapObjectSpace&&a.enable(5),E.normalMapTangentSpace&&a.enable(6),E.clearcoat&&a.enable(7),E.iridescence&&a.enable(8),E.alphaTest&&a.enable(9),E.vertexColors&&a.enable(10),E.vertexAlphas&&a.enable(11),E.vertexUv1s&&a.enable(12),E.vertexUv2s&&a.enable(13),E.vertexUv3s&&a.enable(14),E.vertexTangents&&a.enable(15),E.anisotropy&&a.enable(16),E.alphaHash&&a.enable(17),E.batching&&a.enable(18),E.dispersion&&a.enable(19),E.batchingColor&&a.enable(20),E.gradientMap&&a.enable(21),x.push(a.mask),a.disableAll(),E.fog&&a.enable(0),E.useFog&&a.enable(1),E.flatShading&&a.enable(2),E.logarithmicDepthBuffer&&a.enable(3),E.reversedDepthBuffer&&a.enable(4),E.skinning&&a.enable(5),E.morphTargets&&a.enable(6),E.morphNormals&&a.enable(7),E.morphColors&&a.enable(8),E.premultipliedAlpha&&a.enable(9),E.shadowMapEnabled&&a.enable(10),E.doubleSided&&a.enable(11),E.flipSided&&a.enable(12),E.useDepthPacking&&a.enable(13),E.dithering&&a.enable(14),E.transmission&&a.enable(15),E.sheen&&a.enable(16),E.opaque&&a.enable(17),E.pointsUvs&&a.enable(18),E.decodeVideoTexture&&a.enable(19),E.decodeVideoTextureEmissive&&a.enable(20),E.alphaToCoverage&&a.enable(21),x.push(a.mask)}function w(x){const E=d[x.type];let X;if(E){const I=Gn[E];X=sp.clone(I.uniforms)}else X=x.uniforms;return X}function M(x,E){let X=h.get(E);return X!==void 0?++X.usedTimes:(X=new U_(i,E,x,s),c.push(X),h.set(E,X)),X}function D(x){if(--x.usedTimes===0){const E=c.indexOf(x);c[E]=c[c.length-1],c.pop(),h.delete(x.cacheKey),x.destroy()}}function R(x){o.remove(x)}function L(){o.dispose()}return{getParameters:v,getProgramCacheKey:m,getUniforms:w,acquireProgram:M,releaseProgram:D,releaseShaderCache:R,programs:c,dispose:L}}function z_(){let i=new WeakMap;function e(a){return i.has(a)}function t(a){let o=i.get(a);return o===void 0&&(o={},i.set(a,o)),o}function n(a){i.delete(a)}function s(a,o,l){i.get(a)[o]=l}function r(){i=new WeakMap}return{has:e,get:t,remove:n,update:s,dispose:r}}function k_(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.material.id!==e.material.id?i.material.id-e.material.id:i.materialVariant!==e.materialVariant?i.materialVariant-e.materialVariant:i.z!==e.z?i.z-e.z:i.id-e.id}function Ih(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.z!==e.z?e.z-i.z:i.id-e.id}function Lh(){const i=[];let e=0;const t=[],n=[],s=[];function r(){e=0,t.length=0,n.length=0,s.length=0}function a(f){let d=0;return f.isInstancedMesh&&(d+=2),f.isSkinnedMesh&&(d+=1),d}function o(f,d,g,v,m,p){let y=i[e];return y===void 0?(y={id:f.id,object:f,geometry:d,material:g,materialVariant:a(f),groupOrder:v,renderOrder:f.renderOrder,z:m,group:p},i[e]=y):(y.id=f.id,y.object=f,y.geometry=d,y.material=g,y.materialVariant=a(f),y.groupOrder=v,y.renderOrder=f.renderOrder,y.z=m,y.group=p),e++,y}function l(f,d,g,v,m,p){const y=o(f,d,g,v,m,p);g.transmission>0?n.push(y):g.transparent===!0?s.push(y):t.push(y)}function c(f,d,g,v,m,p){const y=o(f,d,g,v,m,p);g.transmission>0?n.unshift(y):g.transparent===!0?s.unshift(y):t.unshift(y)}function h(f,d){t.length>1&&t.sort(f||k_),n.length>1&&n.sort(d||Ih),s.length>1&&s.sort(d||Ih)}function u(){for(let f=e,d=i.length;f<d;f++){const g=i[f];if(g.id===null)break;g.id=null,g.object=null,g.geometry=null,g.material=null,g.group=null}}return{opaque:t,transmissive:n,transparent:s,init:r,push:l,unshift:c,finish:u,sort:h}}function V_(){let i=new WeakMap;function e(n,s){const r=i.get(n);let a;return r===void 0?(a=new Lh,i.set(n,[a])):s>=r.length?(a=new Lh,r.push(a)):a=r[s],a}function t(){i=new WeakMap}return{get:e,dispose:t}}function G_(){const i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new O,color:new He};break;case"SpotLight":t={position:new O,direction:new O,color:new He,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new O,color:new He,distance:0,decay:0};break;case"HemisphereLight":t={direction:new O,skyColor:new He,groundColor:new He};break;case"RectAreaLight":t={color:new He,position:new O,halfWidth:new O,halfHeight:new O};break}return i[e.id]=t,t}}}function H_(){const i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Le};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Le};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Le,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[e.id]=t,t}}}let W_=0;function X_(i,e){return(e.castShadow?2:0)-(i.castShadow?2:0)+(e.map?1:0)-(i.map?1:0)}function $_(i){const e=new G_,t=H_(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)n.probe.push(new O);const s=new O,r=new xt,a=new xt;function o(c){let h=0,u=0,f=0;for(let E=0;E<9;E++)n.probe[E].set(0,0,0);let d=0,g=0,v=0,m=0,p=0,y=0,w=0,M=0,D=0,R=0,L=0;c.sort(X_);for(let E=0,X=c.length;E<X;E++){const I=c[E],G=I.color,b=I.intensity,U=I.distance;let C=null;if(I.shadow&&I.shadow.map&&(I.shadow.map.texture.format===ks?C=I.shadow.map.texture:C=I.shadow.map.depthTexture||I.shadow.map.texture),I.isAmbientLight)h+=G.r*b,u+=G.g*b,f+=G.b*b;else if(I.isLightProbe){for(let P=0;P<9;P++)n.probe[P].addScaledVector(I.sh.coefficients[P],b);L++}else if(I.isDirectionalLight){const P=e.get(I);if(P.color.copy(I.color).multiplyScalar(I.intensity),I.castShadow){const A=I.shadow,q=t.get(I);q.shadowIntensity=A.intensity,q.shadowBias=A.bias,q.shadowNormalBias=A.normalBias,q.shadowRadius=A.radius,q.shadowMapSize=A.mapSize,n.directionalShadow[d]=q,n.directionalShadowMap[d]=C,n.directionalShadowMatrix[d]=I.shadow.matrix,y++}n.directional[d]=P,d++}else if(I.isSpotLight){const P=e.get(I);P.position.setFromMatrixPosition(I.matrixWorld),P.color.copy(G).multiplyScalar(b),P.distance=U,P.coneCos=Math.cos(I.angle),P.penumbraCos=Math.cos(I.angle*(1-I.penumbra)),P.decay=I.decay,n.spot[v]=P;const A=I.shadow;if(I.map&&(n.spotLightMap[D]=I.map,D++,A.updateMatrices(I),I.castShadow&&R++),n.spotLightMatrix[v]=A.matrix,I.castShadow){const q=t.get(I);q.shadowIntensity=A.intensity,q.shadowBias=A.bias,q.shadowNormalBias=A.normalBias,q.shadowRadius=A.radius,q.shadowMapSize=A.mapSize,n.spotShadow[v]=q,n.spotShadowMap[v]=C,M++}v++}else if(I.isRectAreaLight){const P=e.get(I);P.color.copy(G).multiplyScalar(b),P.halfWidth.set(I.width*.5,0,0),P.halfHeight.set(0,I.height*.5,0),n.rectArea[m]=P,m++}else if(I.isPointLight){const P=e.get(I);if(P.color.copy(I.color).multiplyScalar(I.intensity),P.distance=I.distance,P.decay=I.decay,I.castShadow){const A=I.shadow,q=t.get(I);q.shadowIntensity=A.intensity,q.shadowBias=A.bias,q.shadowNormalBias=A.normalBias,q.shadowRadius=A.radius,q.shadowMapSize=A.mapSize,q.shadowCameraNear=A.camera.near,q.shadowCameraFar=A.camera.far,n.pointShadow[g]=q,n.pointShadowMap[g]=C,n.pointShadowMatrix[g]=I.shadow.matrix,w++}n.point[g]=P,g++}else if(I.isHemisphereLight){const P=e.get(I);P.skyColor.copy(I.color).multiplyScalar(b),P.groundColor.copy(I.groundColor).multiplyScalar(b),n.hemi[p]=P,p++}}m>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=de.LTC_FLOAT_1,n.rectAreaLTC2=de.LTC_FLOAT_2):(n.rectAreaLTC1=de.LTC_HALF_1,n.rectAreaLTC2=de.LTC_HALF_2)),n.ambient[0]=h,n.ambient[1]=u,n.ambient[2]=f;const x=n.hash;(x.directionalLength!==d||x.pointLength!==g||x.spotLength!==v||x.rectAreaLength!==m||x.hemiLength!==p||x.numDirectionalShadows!==y||x.numPointShadows!==w||x.numSpotShadows!==M||x.numSpotMaps!==D||x.numLightProbes!==L)&&(n.directional.length=d,n.spot.length=v,n.rectArea.length=m,n.point.length=g,n.hemi.length=p,n.directionalShadow.length=y,n.directionalShadowMap.length=y,n.pointShadow.length=w,n.pointShadowMap.length=w,n.spotShadow.length=M,n.spotShadowMap.length=M,n.directionalShadowMatrix.length=y,n.pointShadowMatrix.length=w,n.spotLightMatrix.length=M+D-R,n.spotLightMap.length=D,n.numSpotLightShadowsWithMaps=R,n.numLightProbes=L,x.directionalLength=d,x.pointLength=g,x.spotLength=v,x.rectAreaLength=m,x.hemiLength=p,x.numDirectionalShadows=y,x.numPointShadows=w,x.numSpotShadows=M,x.numSpotMaps=D,x.numLightProbes=L,n.version=W_++)}function l(c,h){let u=0,f=0,d=0,g=0,v=0;const m=h.matrixWorldInverse;for(let p=0,y=c.length;p<y;p++){const w=c[p];if(w.isDirectionalLight){const M=n.directional[u];M.direction.setFromMatrixPosition(w.matrixWorld),s.setFromMatrixPosition(w.target.matrixWorld),M.direction.sub(s),M.direction.transformDirection(m),u++}else if(w.isSpotLight){const M=n.spot[d];M.position.setFromMatrixPosition(w.matrixWorld),M.position.applyMatrix4(m),M.direction.setFromMatrixPosition(w.matrixWorld),s.setFromMatrixPosition(w.target.matrixWorld),M.direction.sub(s),M.direction.transformDirection(m),d++}else if(w.isRectAreaLight){const M=n.rectArea[g];M.position.setFromMatrixPosition(w.matrixWorld),M.position.applyMatrix4(m),a.identity(),r.copy(w.matrixWorld),r.premultiply(m),a.extractRotation(r),M.halfWidth.set(w.width*.5,0,0),M.halfHeight.set(0,w.height*.5,0),M.halfWidth.applyMatrix4(a),M.halfHeight.applyMatrix4(a),g++}else if(w.isPointLight){const M=n.point[f];M.position.setFromMatrixPosition(w.matrixWorld),M.position.applyMatrix4(m),f++}else if(w.isHemisphereLight){const M=n.hemi[v];M.direction.setFromMatrixPosition(w.matrixWorld),M.direction.transformDirection(m),v++}}}return{setup:o,setupView:l,state:n}}function Uh(i){const e=new $_(i),t=[],n=[];function s(h){c.camera=h,t.length=0,n.length=0}function r(h){t.push(h)}function a(h){n.push(h)}function o(){e.setup(t)}function l(h){e.setupView(t,h)}const c={lightsArray:t,shadowsArray:n,camera:null,lights:e,transmissionRenderTarget:{}};return{init:s,state:c,setupLights:o,setupLightsView:l,pushLight:r,pushShadow:a}}function Y_(i){let e=new WeakMap;function t(s,r=0){const a=e.get(s);let o;return a===void 0?(o=new Uh(i),e.set(s,[o])):r>=a.length?(o=new Uh(i),a.push(o)):o=a[r],o}function n(){e=new WeakMap}return{get:t,dispose:n}}const q_=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,j_=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ).rg;
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ).r;
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( max( 0.0, squared_mean - mean * mean ) );
	gl_FragColor = vec4( mean, std_dev, 0.0, 1.0 );
}`,Z_=[new O(1,0,0),new O(-1,0,0),new O(0,1,0),new O(0,-1,0),new O(0,0,1),new O(0,0,-1)],K_=[new O(0,-1,0),new O(0,-1,0),new O(0,0,1),new O(0,0,-1),new O(0,-1,0),new O(0,-1,0)],Nh=new xt,rr=new O,Mo=new O;function J_(i,e,t){let n=new ql;const s=new Le,r=new Le,a=new Tt,o=new lp,l=new cp,c={},h=t.maxTextureSize,u={[Fi]:un,[un]:Fi,[Hn]:Hn},f=new ti({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Le},radius:{value:4}},vertexShader:q_,fragmentShader:j_}),d=f.clone();d.defines.HORIZONTAL_PASS=1;const g=new Yt;g.setAttribute("position",new Sn(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const v=new Ie(g,f),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=cr;let p=this.type;this.render=function(R,L,x){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||R.length===0)return;this.type===hf&&(Fe("WebGLShadowMap: PCFSoftShadowMap has been deprecated. Using PCFShadowMap instead."),this.type=cr);const E=i.getRenderTarget(),X=i.getActiveCubeFace(),I=i.getActiveMipmapLevel(),G=i.state;G.setBlending(pi),G.buffers.depth.getReversed()===!0?G.buffers.color.setClear(0,0,0,0):G.buffers.color.setClear(1,1,1,1),G.buffers.depth.setTest(!0),G.setScissorTest(!1);const b=p!==this.type;b&&L.traverse(function(U){U.material&&(Array.isArray(U.material)?U.material.forEach(C=>C.needsUpdate=!0):U.material.needsUpdate=!0)});for(let U=0,C=R.length;U<C;U++){const P=R[U],A=P.shadow;if(A===void 0){Fe("WebGLShadowMap:",P,"has no shadow.");continue}if(A.autoUpdate===!1&&A.needsUpdate===!1)continue;s.copy(A.mapSize);const q=A.getFrameExtents();s.multiply(q),r.copy(A.mapSize),(s.x>h||s.y>h)&&(s.x>h&&(r.x=Math.floor(h/q.x),s.x=r.x*q.x,A.mapSize.x=r.x),s.y>h&&(r.y=Math.floor(h/q.y),s.y=r.y*q.y,A.mapSize.y=r.y));const j=i.state.buffers.depth.getReversed();if(A.camera._reversedDepth=j,A.map===null||b===!0){if(A.map!==null&&(A.map.depthTexture!==null&&(A.map.depthTexture.dispose(),A.map.depthTexture=null),A.map.dispose()),this.type===or){if(P.isPointLight){Fe("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}A.map=new jn(s.x,s.y,{format:ks,type:_i,minFilter:$t,magFilter:$t,generateMipmaps:!1}),A.map.texture.name=P.name+".shadowMap",A.map.depthTexture=new _r(s.x,s.y,$n),A.map.depthTexture.name=P.name+".shadowMapDepth",A.map.depthTexture.format=xi,A.map.depthTexture.compareFunction=null,A.map.depthTexture.minFilter=Zt,A.map.depthTexture.magFilter=Zt}else P.isPointLight?(A.map=new Xf(s.x),A.map.depthTexture=new np(s.x,Qn)):(A.map=new jn(s.x,s.y),A.map.depthTexture=new _r(s.x,s.y,Qn)),A.map.depthTexture.name=P.name+".shadowMap",A.map.depthTexture.format=xi,this.type===cr?(A.map.depthTexture.compareFunction=j?Wl:Hl,A.map.depthTexture.minFilter=$t,A.map.depthTexture.magFilter=$t):(A.map.depthTexture.compareFunction=null,A.map.depthTexture.minFilter=Zt,A.map.depthTexture.magFilter=Zt);A.camera.updateProjectionMatrix()}const ee=A.map.isWebGLCubeRenderTarget?6:1;for(let se=0;se<ee;se++){if(A.map.isWebGLCubeRenderTarget)i.setRenderTarget(A.map,se),i.clear();else{se===0&&(i.setRenderTarget(A.map),i.clear());const ie=A.getViewport(se);a.set(r.x*ie.x,r.y*ie.y,r.x*ie.z,r.y*ie.w),G.viewport(a)}if(P.isPointLight){const ie=A.camera,Pe=A.matrix,qe=P.distance||ie.far;qe!==ie.far&&(ie.far=qe,ie.updateProjectionMatrix()),rr.setFromMatrixPosition(P.matrixWorld),ie.position.copy(rr),Mo.copy(ie.position),Mo.add(Z_[se]),ie.up.copy(K_[se]),ie.lookAt(Mo),ie.updateMatrixWorld(),Pe.makeTranslation(-rr.x,-rr.y,-rr.z),Nh.multiplyMatrices(ie.projectionMatrix,ie.matrixWorldInverse),A._frustum.setFromProjectionMatrix(Nh,ie.coordinateSystem,ie.reversedDepth)}else A.updateMatrices(P);n=A.getFrustum(),M(L,x,A.camera,P,this.type)}A.isPointLightShadow!==!0&&this.type===or&&y(A,x),A.needsUpdate=!1}p=this.type,m.needsUpdate=!1,i.setRenderTarget(E,X,I)};function y(R,L){const x=e.update(v);f.defines.VSM_SAMPLES!==R.blurSamples&&(f.defines.VSM_SAMPLES=R.blurSamples,d.defines.VSM_SAMPLES=R.blurSamples,f.needsUpdate=!0,d.needsUpdate=!0),R.mapPass===null&&(R.mapPass=new jn(s.x,s.y,{format:ks,type:_i})),f.uniforms.shadow_pass.value=R.map.depthTexture,f.uniforms.resolution.value=R.mapSize,f.uniforms.radius.value=R.radius,i.setRenderTarget(R.mapPass),i.clear(),i.renderBufferDirect(L,null,x,f,v,null),d.uniforms.shadow_pass.value=R.mapPass.texture,d.uniforms.resolution.value=R.mapSize,d.uniforms.radius.value=R.radius,i.setRenderTarget(R.map),i.clear(),i.renderBufferDirect(L,null,x,d,v,null)}function w(R,L,x,E){let X=null;const I=x.isPointLight===!0?R.customDistanceMaterial:R.customDepthMaterial;if(I!==void 0)X=I;else if(X=x.isPointLight===!0?l:o,i.localClippingEnabled&&L.clipShadows===!0&&Array.isArray(L.clippingPlanes)&&L.clippingPlanes.length!==0||L.displacementMap&&L.displacementScale!==0||L.alphaMap&&L.alphaTest>0||L.map&&L.alphaTest>0||L.alphaToCoverage===!0){const G=X.uuid,b=L.uuid;let U=c[G];U===void 0&&(U={},c[G]=U);let C=U[b];C===void 0&&(C=X.clone(),U[b]=C,L.addEventListener("dispose",D)),X=C}if(X.visible=L.visible,X.wireframe=L.wireframe,E===or?X.side=L.shadowSide!==null?L.shadowSide:L.side:X.side=L.shadowSide!==null?L.shadowSide:u[L.side],X.alphaMap=L.alphaMap,X.alphaTest=L.alphaToCoverage===!0?.5:L.alphaTest,X.map=L.map,X.clipShadows=L.clipShadows,X.clippingPlanes=L.clippingPlanes,X.clipIntersection=L.clipIntersection,X.displacementMap=L.displacementMap,X.displacementScale=L.displacementScale,X.displacementBias=L.displacementBias,X.wireframeLinewidth=L.wireframeLinewidth,X.linewidth=L.linewidth,x.isPointLight===!0&&X.isMeshDistanceMaterial===!0){const G=i.properties.get(X);G.light=x}return X}function M(R,L,x,E,X){if(R.visible===!1)return;if(R.layers.test(L.layers)&&(R.isMesh||R.isLine||R.isPoints)&&(R.castShadow||R.receiveShadow&&X===or)&&(!R.frustumCulled||n.intersectsObject(R))){R.modelViewMatrix.multiplyMatrices(x.matrixWorldInverse,R.matrixWorld);const b=e.update(R),U=R.material;if(Array.isArray(U)){const C=b.groups;for(let P=0,A=C.length;P<A;P++){const q=C[P],j=U[q.materialIndex];if(j&&j.visible){const ee=w(R,j,E,X);R.onBeforeShadow(i,R,L,x,b,ee,q),i.renderBufferDirect(x,null,b,ee,R,q),R.onAfterShadow(i,R,L,x,b,ee,q)}}}else if(U.visible){const C=w(R,U,E,X);R.onBeforeShadow(i,R,L,x,b,C,null),i.renderBufferDirect(x,null,b,C,R,null),R.onAfterShadow(i,R,L,x,b,C,null)}}const G=R.children;for(let b=0,U=G.length;b<U;b++)M(G[b],L,x,E,X)}function D(R){R.target.removeEventListener("dispose",D);for(const x in c){const E=c[x],X=R.target.uuid;X in E&&(E[X].dispose(),delete E[X])}}}function Q_(i,e){function t(){let F=!1;const fe=new Tt;let ce=null;const ye=new Tt(0,0,0,0);return{setMask:function(oe){ce!==oe&&!F&&(i.colorMask(oe,oe,oe,oe),ce=oe)},setLocked:function(oe){F=oe},setClear:function(oe,Z,Ee,Be,mt){mt===!0&&(oe*=Be,Z*=Be,Ee*=Be),fe.set(oe,Z,Ee,Be),ye.equals(fe)===!1&&(i.clearColor(oe,Z,Ee,Be),ye.copy(fe))},reset:function(){F=!1,ce=null,ye.set(-1,0,0,0)}}}function n(){let F=!1,fe=!1,ce=null,ye=null,oe=null;return{setReversed:function(Z){if(fe!==Z){const Ee=e.get("EXT_clip_control");Z?Ee.clipControlEXT(Ee.LOWER_LEFT_EXT,Ee.ZERO_TO_ONE_EXT):Ee.clipControlEXT(Ee.LOWER_LEFT_EXT,Ee.NEGATIVE_ONE_TO_ONE_EXT),fe=Z;const Be=oe;oe=null,this.setClear(Be)}},getReversed:function(){return fe},setTest:function(Z){Z?ae(i.DEPTH_TEST):ue(i.DEPTH_TEST)},setMask:function(Z){ce!==Z&&!F&&(i.depthMask(Z),ce=Z)},setFunc:function(Z){if(fe&&(Z=Rd[Z]),ye!==Z){switch(Z){case Ro:i.depthFunc(i.NEVER);break;case Po:i.depthFunc(i.ALWAYS);break;case Do:i.depthFunc(i.LESS);break;case Bs:i.depthFunc(i.LEQUAL);break;case Io:i.depthFunc(i.EQUAL);break;case Lo:i.depthFunc(i.GEQUAL);break;case Uo:i.depthFunc(i.GREATER);break;case No:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}ye=Z}},setLocked:function(Z){F=Z},setClear:function(Z){oe!==Z&&(oe=Z,fe&&(Z=1-Z),i.clearDepth(Z))},reset:function(){F=!1,ce=null,ye=null,oe=null,fe=!1}}}function s(){let F=!1,fe=null,ce=null,ye=null,oe=null,Z=null,Ee=null,Be=null,mt=null;return{setTest:function(rt){F||(rt?ae(i.STENCIL_TEST):ue(i.STENCIL_TEST))},setMask:function(rt){fe!==rt&&!F&&(i.stencilMask(rt),fe=rt)},setFunc:function(rt,ni,ii){(ce!==rt||ye!==ni||oe!==ii)&&(i.stencilFunc(rt,ni,ii),ce=rt,ye=ni,oe=ii)},setOp:function(rt,ni,ii){(Z!==rt||Ee!==ni||Be!==ii)&&(i.stencilOp(rt,ni,ii),Z=rt,Ee=ni,Be=ii)},setLocked:function(rt){F=rt},setClear:function(rt){mt!==rt&&(i.clearStencil(rt),mt=rt)},reset:function(){F=!1,fe=null,ce=null,ye=null,oe=null,Z=null,Ee=null,Be=null,mt=null}}}const r=new t,a=new n,o=new s,l=new WeakMap,c=new WeakMap;let h={},u={},f=new WeakMap,d=[],g=null,v=!1,m=null,p=null,y=null,w=null,M=null,D=null,R=null,L=new He(0,0,0),x=0,E=!1,X=null,I=null,G=null,b=null,U=null;const C=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let P=!1,A=0;const q=i.getParameter(i.VERSION);q.indexOf("WebGL")!==-1?(A=parseFloat(/^WebGL (\d)/.exec(q)[1]),P=A>=1):q.indexOf("OpenGL ES")!==-1&&(A=parseFloat(/^OpenGL ES (\d)/.exec(q)[1]),P=A>=2);let j=null,ee={};const se=i.getParameter(i.SCISSOR_BOX),ie=i.getParameter(i.VIEWPORT),Pe=new Tt().fromArray(se),qe=new Tt().fromArray(ie);function Ke(F,fe,ce,ye){const oe=new Uint8Array(4),Z=i.createTexture();i.bindTexture(F,Z),i.texParameteri(F,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(F,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let Ee=0;Ee<ce;Ee++)F===i.TEXTURE_3D||F===i.TEXTURE_2D_ARRAY?i.texImage3D(fe,0,i.RGBA,1,1,ye,0,i.RGBA,i.UNSIGNED_BYTE,oe):i.texImage2D(fe+Ee,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,oe);return Z}const J={};J[i.TEXTURE_2D]=Ke(i.TEXTURE_2D,i.TEXTURE_2D,1),J[i.TEXTURE_CUBE_MAP]=Ke(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),J[i.TEXTURE_2D_ARRAY]=Ke(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),J[i.TEXTURE_3D]=Ke(i.TEXTURE_3D,i.TEXTURE_3D,1,1),r.setClear(0,0,0,1),a.setClear(1),o.setClear(0),ae(i.DEPTH_TEST),a.setFunc(Bs),We(!1),At(Pc),ae(i.CULL_FACE),st(pi);function ae(F){h[F]!==!0&&(i.enable(F),h[F]=!0)}function ue(F){h[F]!==!1&&(i.disable(F),h[F]=!1)}function ke(F,fe){return u[F]!==fe?(i.bindFramebuffer(F,fe),u[F]=fe,F===i.DRAW_FRAMEBUFFER&&(u[i.FRAMEBUFFER]=fe),F===i.FRAMEBUFFER&&(u[i.DRAW_FRAMEBUFFER]=fe),!0):!1}function Ue(F,fe){let ce=d,ye=!1;if(F){ce=f.get(fe),ce===void 0&&(ce=[],f.set(fe,ce));const oe=F.textures;if(ce.length!==oe.length||ce[0]!==i.COLOR_ATTACHMENT0){for(let Z=0,Ee=oe.length;Z<Ee;Z++)ce[Z]=i.COLOR_ATTACHMENT0+Z;ce.length=oe.length,ye=!0}}else ce[0]!==i.BACK&&(ce[0]=i.BACK,ye=!0);ye&&i.drawBuffers(ce)}function Oe(F){return g!==F?(i.useProgram(F),g=F,!0):!1}const kt={[Ki]:i.FUNC_ADD,[Ju]:i.FUNC_SUBTRACT,[Qu]:i.FUNC_REVERSE_SUBTRACT};kt[ed]=i.MIN,kt[td]=i.MAX;const Qe={[nd]:i.ZERO,[id]:i.ONE,[sd]:i.SRC_COLOR,[Ao]:i.SRC_ALPHA,[hd]:i.SRC_ALPHA_SATURATE,[ld]:i.DST_COLOR,[ad]:i.DST_ALPHA,[rd]:i.ONE_MINUS_SRC_COLOR,[Co]:i.ONE_MINUS_SRC_ALPHA,[cd]:i.ONE_MINUS_DST_COLOR,[od]:i.ONE_MINUS_DST_ALPHA,[fd]:i.CONSTANT_COLOR,[ud]:i.ONE_MINUS_CONSTANT_COLOR,[dd]:i.CONSTANT_ALPHA,[pd]:i.ONE_MINUS_CONSTANT_ALPHA};function st(F,fe,ce,ye,oe,Z,Ee,Be,mt,rt){if(F===pi){v===!0&&(ue(i.BLEND),v=!1);return}if(v===!1&&(ae(i.BLEND),v=!0),F!==Ku){if(F!==m||rt!==E){if((p!==Ki||M!==Ki)&&(i.blendEquation(i.FUNC_ADD),p=Ki,M=Ki),rt)switch(F){case Us:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case _a:i.blendFunc(i.ONE,i.ONE);break;case Dc:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case Ic:i.blendFuncSeparate(i.DST_COLOR,i.ONE_MINUS_SRC_ALPHA,i.ZERO,i.ONE);break;default:Je("WebGLState: Invalid blending: ",F);break}else switch(F){case Us:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case _a:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE,i.ONE,i.ONE);break;case Dc:Je("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case Ic:Je("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:Je("WebGLState: Invalid blending: ",F);break}y=null,w=null,D=null,R=null,L.set(0,0,0),x=0,m=F,E=rt}return}oe=oe||fe,Z=Z||ce,Ee=Ee||ye,(fe!==p||oe!==M)&&(i.blendEquationSeparate(kt[fe],kt[oe]),p=fe,M=oe),(ce!==y||ye!==w||Z!==D||Ee!==R)&&(i.blendFuncSeparate(Qe[ce],Qe[ye],Qe[Z],Qe[Ee]),y=ce,w=ye,D=Z,R=Ee),(Be.equals(L)===!1||mt!==x)&&(i.blendColor(Be.r,Be.g,Be.b,mt),L.copy(Be),x=mt),m=F,E=!1}function ut(F,fe){F.side===Hn?ue(i.CULL_FACE):ae(i.CULL_FACE);let ce=F.side===un;fe&&(ce=!ce),We(ce),F.blending===Us&&F.transparent===!1?st(pi):st(F.blending,F.blendEquation,F.blendSrc,F.blendDst,F.blendEquationAlpha,F.blendSrcAlpha,F.blendDstAlpha,F.blendColor,F.blendAlpha,F.premultipliedAlpha),a.setFunc(F.depthFunc),a.setTest(F.depthTest),a.setMask(F.depthWrite),r.setMask(F.colorWrite);const ye=F.stencilWrite;o.setTest(ye),ye&&(o.setMask(F.stencilWriteMask),o.setFunc(F.stencilFunc,F.stencilRef,F.stencilFuncMask),o.setOp(F.stencilFail,F.stencilZFail,F.stencilZPass)),Ut(F.polygonOffset,F.polygonOffsetFactor,F.polygonOffsetUnits),F.alphaToCoverage===!0?ae(i.SAMPLE_ALPHA_TO_COVERAGE):ue(i.SAMPLE_ALPHA_TO_COVERAGE)}function We(F){X!==F&&(F?i.frontFace(i.CW):i.frontFace(i.CCW),X=F)}function At(F){F!==ju?(ae(i.CULL_FACE),F!==I&&(F===Pc?i.cullFace(i.BACK):F===Zu?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):ue(i.CULL_FACE),I=F}function N(F){F!==G&&(P&&i.lineWidth(F),G=F)}function Ut(F,fe,ce){F?(ae(i.POLYGON_OFFSET_FILL),(b!==fe||U!==ce)&&(b=fe,U=ce,a.getReversed()&&(fe=-fe),i.polygonOffset(fe,ce))):ue(i.POLYGON_OFFSET_FILL)}function it(F){F?ae(i.SCISSOR_TEST):ue(i.SCISSOR_TEST)}function pt(F){F===void 0&&(F=i.TEXTURE0+C-1),j!==F&&(i.activeTexture(F),j=F)}function Te(F,fe,ce){ce===void 0&&(j===null?ce=i.TEXTURE0+C-1:ce=j);let ye=ee[ce];ye===void 0&&(ye={type:void 0,texture:void 0},ee[ce]=ye),(ye.type!==F||ye.texture!==fe)&&(j!==ce&&(i.activeTexture(ce),j=ce),i.bindTexture(F,fe||J[F]),ye.type=F,ye.texture=fe)}function T(){const F=ee[j];F!==void 0&&F.type!==void 0&&(i.bindTexture(F.type,null),F.type=void 0,F.texture=void 0)}function _(){try{i.compressedTexImage2D(...arguments)}catch(F){Je("WebGLState:",F)}}function B(){try{i.compressedTexImage3D(...arguments)}catch(F){Je("WebGLState:",F)}}function Q(){try{i.texSubImage2D(...arguments)}catch(F){Je("WebGLState:",F)}}function te(){try{i.texSubImage3D(...arguments)}catch(F){Je("WebGLState:",F)}}function K(){try{i.compressedTexSubImage2D(...arguments)}catch(F){Je("WebGLState:",F)}}function Se(){try{i.compressedTexSubImage3D(...arguments)}catch(F){Je("WebGLState:",F)}}function he(){try{i.texStorage2D(...arguments)}catch(F){Je("WebGLState:",F)}}function De(){try{i.texStorage3D(...arguments)}catch(F){Je("WebGLState:",F)}}function Ne(){try{i.texImage2D(...arguments)}catch(F){Je("WebGLState:",F)}}function re(){try{i.texImage3D(...arguments)}catch(F){Je("WebGLState:",F)}}function le(F){Pe.equals(F)===!1&&(i.scissor(F.x,F.y,F.z,F.w),Pe.copy(F))}function Me(F){qe.equals(F)===!1&&(i.viewport(F.x,F.y,F.z,F.w),qe.copy(F))}function be(F,fe){let ce=c.get(fe);ce===void 0&&(ce=new WeakMap,c.set(fe,ce));let ye=ce.get(F);ye===void 0&&(ye=i.getUniformBlockIndex(fe,F.name),ce.set(F,ye))}function xe(F,fe){const ye=c.get(fe).get(F);l.get(fe)!==ye&&(i.uniformBlockBinding(fe,ye,F.__bindingPointIndex),l.set(fe,ye))}function Xe(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),a.setReversed(!1),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),h={},j=null,ee={},u={},f=new WeakMap,d=[],g=null,v=!1,m=null,p=null,y=null,w=null,M=null,D=null,R=null,L=new He(0,0,0),x=0,E=!1,X=null,I=null,G=null,b=null,U=null,Pe.set(0,0,i.canvas.width,i.canvas.height),qe.set(0,0,i.canvas.width,i.canvas.height),r.reset(),a.reset(),o.reset()}return{buffers:{color:r,depth:a,stencil:o},enable:ae,disable:ue,bindFramebuffer:ke,drawBuffers:Ue,useProgram:Oe,setBlending:st,setMaterial:ut,setFlipSided:We,setCullFace:At,setLineWidth:N,setPolygonOffset:Ut,setScissorTest:it,activeTexture:pt,bindTexture:Te,unbindTexture:T,compressedTexImage2D:_,compressedTexImage3D:B,texImage2D:Ne,texImage3D:re,updateUBOMapping:be,uniformBlockBinding:xe,texStorage2D:he,texStorage3D:De,texSubImage2D:Q,texSubImage3D:te,compressedTexSubImage2D:K,compressedTexSubImage3D:Se,scissor:le,viewport:Me,reset:Xe}}function ex(i,e,t,n,s,r,a){const o=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new Le,h=new WeakMap;let u;const f=new WeakMap;let d=!1;try{d=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(T,_){return d?new OffscreenCanvas(T,_):va("canvas")}function v(T,_,B){let Q=1;const te=Te(T);if((te.width>B||te.height>B)&&(Q=B/Math.max(te.width,te.height)),Q<1)if(typeof HTMLImageElement<"u"&&T instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&T instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&T instanceof ImageBitmap||typeof VideoFrame<"u"&&T instanceof VideoFrame){const K=Math.floor(Q*te.width),Se=Math.floor(Q*te.height);u===void 0&&(u=g(K,Se));const he=_?g(K,Se):u;return he.width=K,he.height=Se,he.getContext("2d").drawImage(T,0,0,K,Se),Fe("WebGLRenderer: Texture has been resized from ("+te.width+"x"+te.height+") to ("+K+"x"+Se+")."),he}else return"data"in T&&Fe("WebGLRenderer: Image in DataTexture is too big ("+te.width+"x"+te.height+")."),T;return T}function m(T){return T.generateMipmaps}function p(T){i.generateMipmap(T)}function y(T){return T.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:T.isWebGL3DRenderTarget?i.TEXTURE_3D:T.isWebGLArrayRenderTarget||T.isCompressedArrayTexture?i.TEXTURE_2D_ARRAY:i.TEXTURE_2D}function w(T,_,B,Q,te=!1){if(T!==null){if(i[T]!==void 0)return i[T];Fe("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+T+"'")}let K=_;if(_===i.RED&&(B===i.FLOAT&&(K=i.R32F),B===i.HALF_FLOAT&&(K=i.R16F),B===i.UNSIGNED_BYTE&&(K=i.R8)),_===i.RED_INTEGER&&(B===i.UNSIGNED_BYTE&&(K=i.R8UI),B===i.UNSIGNED_SHORT&&(K=i.R16UI),B===i.UNSIGNED_INT&&(K=i.R32UI),B===i.BYTE&&(K=i.R8I),B===i.SHORT&&(K=i.R16I),B===i.INT&&(K=i.R32I)),_===i.RG&&(B===i.FLOAT&&(K=i.RG32F),B===i.HALF_FLOAT&&(K=i.RG16F),B===i.UNSIGNED_BYTE&&(K=i.RG8)),_===i.RG_INTEGER&&(B===i.UNSIGNED_BYTE&&(K=i.RG8UI),B===i.UNSIGNED_SHORT&&(K=i.RG16UI),B===i.UNSIGNED_INT&&(K=i.RG32UI),B===i.BYTE&&(K=i.RG8I),B===i.SHORT&&(K=i.RG16I),B===i.INT&&(K=i.RG32I)),_===i.RGB_INTEGER&&(B===i.UNSIGNED_BYTE&&(K=i.RGB8UI),B===i.UNSIGNED_SHORT&&(K=i.RGB16UI),B===i.UNSIGNED_INT&&(K=i.RGB32UI),B===i.BYTE&&(K=i.RGB8I),B===i.SHORT&&(K=i.RGB16I),B===i.INT&&(K=i.RGB32I)),_===i.RGBA_INTEGER&&(B===i.UNSIGNED_BYTE&&(K=i.RGBA8UI),B===i.UNSIGNED_SHORT&&(K=i.RGBA16UI),B===i.UNSIGNED_INT&&(K=i.RGBA32UI),B===i.BYTE&&(K=i.RGBA8I),B===i.SHORT&&(K=i.RGBA16I),B===i.INT&&(K=i.RGBA32I)),_===i.RGB&&(B===i.UNSIGNED_INT_5_9_9_9_REV&&(K=i.RGB9_E5),B===i.UNSIGNED_INT_10F_11F_11F_REV&&(K=i.R11F_G11F_B10F)),_===i.RGBA){const Se=te?xa:et.getTransfer(Q);B===i.FLOAT&&(K=i.RGBA32F),B===i.HALF_FLOAT&&(K=i.RGBA16F),B===i.UNSIGNED_BYTE&&(K=Se===at?i.SRGB8_ALPHA8:i.RGBA8),B===i.UNSIGNED_SHORT_4_4_4_4&&(K=i.RGBA4),B===i.UNSIGNED_SHORT_5_5_5_1&&(K=i.RGB5_A1)}return(K===i.R16F||K===i.R32F||K===i.RG16F||K===i.RG32F||K===i.RGBA16F||K===i.RGBA32F)&&e.get("EXT_color_buffer_float"),K}function M(T,_){let B;return T?_===null||_===Qn||_===mr?B=i.DEPTH24_STENCIL8:_===$n?B=i.DEPTH32F_STENCIL8:_===pr&&(B=i.DEPTH24_STENCIL8,Fe("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):_===null||_===Qn||_===mr?B=i.DEPTH_COMPONENT24:_===$n?B=i.DEPTH_COMPONENT32F:_===pr&&(B=i.DEPTH_COMPONENT16),B}function D(T,_){return m(T)===!0||T.isFramebufferTexture&&T.minFilter!==Zt&&T.minFilter!==$t?Math.log2(Math.max(_.width,_.height))+1:T.mipmaps!==void 0&&T.mipmaps.length>0?T.mipmaps.length:T.isCompressedTexture&&Array.isArray(T.image)?_.mipmaps.length:1}function R(T){const _=T.target;_.removeEventListener("dispose",R),x(_),_.isVideoTexture&&h.delete(_)}function L(T){const _=T.target;_.removeEventListener("dispose",L),X(_)}function x(T){const _=n.get(T);if(_.__webglInit===void 0)return;const B=T.source,Q=f.get(B);if(Q){const te=Q[_.__cacheKey];te.usedTimes--,te.usedTimes===0&&E(T),Object.keys(Q).length===0&&f.delete(B)}n.remove(T)}function E(T){const _=n.get(T);i.deleteTexture(_.__webglTexture);const B=T.source,Q=f.get(B);delete Q[_.__cacheKey],a.memory.textures--}function X(T){const _=n.get(T);if(T.depthTexture&&(T.depthTexture.dispose(),n.remove(T.depthTexture)),T.isWebGLCubeRenderTarget)for(let Q=0;Q<6;Q++){if(Array.isArray(_.__webglFramebuffer[Q]))for(let te=0;te<_.__webglFramebuffer[Q].length;te++)i.deleteFramebuffer(_.__webglFramebuffer[Q][te]);else i.deleteFramebuffer(_.__webglFramebuffer[Q]);_.__webglDepthbuffer&&i.deleteRenderbuffer(_.__webglDepthbuffer[Q])}else{if(Array.isArray(_.__webglFramebuffer))for(let Q=0;Q<_.__webglFramebuffer.length;Q++)i.deleteFramebuffer(_.__webglFramebuffer[Q]);else i.deleteFramebuffer(_.__webglFramebuffer);if(_.__webglDepthbuffer&&i.deleteRenderbuffer(_.__webglDepthbuffer),_.__webglMultisampledFramebuffer&&i.deleteFramebuffer(_.__webglMultisampledFramebuffer),_.__webglColorRenderbuffer)for(let Q=0;Q<_.__webglColorRenderbuffer.length;Q++)_.__webglColorRenderbuffer[Q]&&i.deleteRenderbuffer(_.__webglColorRenderbuffer[Q]);_.__webglDepthRenderbuffer&&i.deleteRenderbuffer(_.__webglDepthRenderbuffer)}const B=T.textures;for(let Q=0,te=B.length;Q<te;Q++){const K=n.get(B[Q]);K.__webglTexture&&(i.deleteTexture(K.__webglTexture),a.memory.textures--),n.remove(B[Q])}n.remove(T)}let I=0;function G(){I=0}function b(){const T=I;return T>=s.maxTextures&&Fe("WebGLTextures: Trying to use "+T+" texture units while this GPU supports only "+s.maxTextures),I+=1,T}function U(T){const _=[];return _.push(T.wrapS),_.push(T.wrapT),_.push(T.wrapR||0),_.push(T.magFilter),_.push(T.minFilter),_.push(T.anisotropy),_.push(T.internalFormat),_.push(T.format),_.push(T.type),_.push(T.generateMipmaps),_.push(T.premultiplyAlpha),_.push(T.flipY),_.push(T.unpackAlignment),_.push(T.colorSpace),_.join()}function C(T,_){const B=n.get(T);if(T.isVideoTexture&&it(T),T.isRenderTargetTexture===!1&&T.isExternalTexture!==!0&&T.version>0&&B.__version!==T.version){const Q=T.image;if(Q===null)Fe("WebGLRenderer: Texture marked for update but no image data found.");else if(Q.complete===!1)Fe("WebGLRenderer: Texture marked for update but image is incomplete");else{J(B,T,_);return}}else T.isExternalTexture&&(B.__webglTexture=T.sourceTexture?T.sourceTexture:null);t.bindTexture(i.TEXTURE_2D,B.__webglTexture,i.TEXTURE0+_)}function P(T,_){const B=n.get(T);if(T.isRenderTargetTexture===!1&&T.version>0&&B.__version!==T.version){J(B,T,_);return}else T.isExternalTexture&&(B.__webglTexture=T.sourceTexture?T.sourceTexture:null);t.bindTexture(i.TEXTURE_2D_ARRAY,B.__webglTexture,i.TEXTURE0+_)}function A(T,_){const B=n.get(T);if(T.isRenderTargetTexture===!1&&T.version>0&&B.__version!==T.version){J(B,T,_);return}t.bindTexture(i.TEXTURE_3D,B.__webglTexture,i.TEXTURE0+_)}function q(T,_){const B=n.get(T);if(T.isCubeDepthTexture!==!0&&T.version>0&&B.__version!==T.version){ae(B,T,_);return}t.bindTexture(i.TEXTURE_CUBE_MAP,B.__webglTexture,i.TEXTURE0+_)}const j={[Fo]:i.REPEAT,[di]:i.CLAMP_TO_EDGE,[Oo]:i.MIRRORED_REPEAT},ee={[Zt]:i.NEAREST,[_d]:i.NEAREST_MIPMAP_NEAREST,[Rr]:i.NEAREST_MIPMAP_LINEAR,[$t]:i.LINEAR,[Ha]:i.LINEAR_MIPMAP_NEAREST,[Qi]:i.LINEAR_MIPMAP_LINEAR},se={[yd]:i.NEVER,[wd]:i.ALWAYS,[Sd]:i.LESS,[Hl]:i.LEQUAL,[Md]:i.EQUAL,[Wl]:i.GEQUAL,[Ed]:i.GREATER,[bd]:i.NOTEQUAL};function ie(T,_){if(_.type===$n&&e.has("OES_texture_float_linear")===!1&&(_.magFilter===$t||_.magFilter===Ha||_.magFilter===Rr||_.magFilter===Qi||_.minFilter===$t||_.minFilter===Ha||_.minFilter===Rr||_.minFilter===Qi)&&Fe("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(T,i.TEXTURE_WRAP_S,j[_.wrapS]),i.texParameteri(T,i.TEXTURE_WRAP_T,j[_.wrapT]),(T===i.TEXTURE_3D||T===i.TEXTURE_2D_ARRAY)&&i.texParameteri(T,i.TEXTURE_WRAP_R,j[_.wrapR]),i.texParameteri(T,i.TEXTURE_MAG_FILTER,ee[_.magFilter]),i.texParameteri(T,i.TEXTURE_MIN_FILTER,ee[_.minFilter]),_.compareFunction&&(i.texParameteri(T,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(T,i.TEXTURE_COMPARE_FUNC,se[_.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(_.magFilter===Zt||_.minFilter!==Rr&&_.minFilter!==Qi||_.type===$n&&e.has("OES_texture_float_linear")===!1)return;if(_.anisotropy>1||n.get(_).__currentAnisotropy){const B=e.get("EXT_texture_filter_anisotropic");i.texParameterf(T,B.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(_.anisotropy,s.getMaxAnisotropy())),n.get(_).__currentAnisotropy=_.anisotropy}}}function Pe(T,_){let B=!1;T.__webglInit===void 0&&(T.__webglInit=!0,_.addEventListener("dispose",R));const Q=_.source;let te=f.get(Q);te===void 0&&(te={},f.set(Q,te));const K=U(_);if(K!==T.__cacheKey){te[K]===void 0&&(te[K]={texture:i.createTexture(),usedTimes:0},a.memory.textures++,B=!0),te[K].usedTimes++;const Se=te[T.__cacheKey];Se!==void 0&&(te[T.__cacheKey].usedTimes--,Se.usedTimes===0&&E(_)),T.__cacheKey=K,T.__webglTexture=te[K].texture}return B}function qe(T,_,B){return Math.floor(Math.floor(T/B)/_)}function Ke(T,_,B,Q){const K=T.updateRanges;if(K.length===0)t.texSubImage2D(i.TEXTURE_2D,0,0,0,_.width,_.height,B,Q,_.data);else{K.sort((re,le)=>re.start-le.start);let Se=0;for(let re=1;re<K.length;re++){const le=K[Se],Me=K[re],be=le.start+le.count,xe=qe(Me.start,_.width,4),Xe=qe(le.start,_.width,4);Me.start<=be+1&&xe===Xe&&qe(Me.start+Me.count-1,_.width,4)===xe?le.count=Math.max(le.count,Me.start+Me.count-le.start):(++Se,K[Se]=Me)}K.length=Se+1;const he=i.getParameter(i.UNPACK_ROW_LENGTH),De=i.getParameter(i.UNPACK_SKIP_PIXELS),Ne=i.getParameter(i.UNPACK_SKIP_ROWS);i.pixelStorei(i.UNPACK_ROW_LENGTH,_.width);for(let re=0,le=K.length;re<le;re++){const Me=K[re],be=Math.floor(Me.start/4),xe=Math.ceil(Me.count/4),Xe=be%_.width,F=Math.floor(be/_.width),fe=xe,ce=1;i.pixelStorei(i.UNPACK_SKIP_PIXELS,Xe),i.pixelStorei(i.UNPACK_SKIP_ROWS,F),t.texSubImage2D(i.TEXTURE_2D,0,Xe,F,fe,ce,B,Q,_.data)}T.clearUpdateRanges(),i.pixelStorei(i.UNPACK_ROW_LENGTH,he),i.pixelStorei(i.UNPACK_SKIP_PIXELS,De),i.pixelStorei(i.UNPACK_SKIP_ROWS,Ne)}}function J(T,_,B){let Q=i.TEXTURE_2D;(_.isDataArrayTexture||_.isCompressedArrayTexture)&&(Q=i.TEXTURE_2D_ARRAY),_.isData3DTexture&&(Q=i.TEXTURE_3D);const te=Pe(T,_),K=_.source;t.bindTexture(Q,T.__webglTexture,i.TEXTURE0+B);const Se=n.get(K);if(K.version!==Se.__version||te===!0){t.activeTexture(i.TEXTURE0+B);const he=et.getPrimaries(et.workingColorSpace),De=_.colorSpace===Pi?null:et.getPrimaries(_.colorSpace),Ne=_.colorSpace===Pi||he===De?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,_.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,_.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,_.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,Ne);let re=v(_.image,!1,s.maxTextureSize);re=pt(_,re);const le=r.convert(_.format,_.colorSpace),Me=r.convert(_.type);let be=w(_.internalFormat,le,Me,_.colorSpace,_.isVideoTexture);ie(Q,_);let xe;const Xe=_.mipmaps,F=_.isVideoTexture!==!0,fe=Se.__version===void 0||te===!0,ce=K.dataReady,ye=D(_,re);if(_.isDepthTexture)be=M(_.format===es,_.type),fe&&(F?t.texStorage2D(i.TEXTURE_2D,1,be,re.width,re.height):t.texImage2D(i.TEXTURE_2D,0,be,re.width,re.height,0,le,Me,null));else if(_.isDataTexture)if(Xe.length>0){F&&fe&&t.texStorage2D(i.TEXTURE_2D,ye,be,Xe[0].width,Xe[0].height);for(let oe=0,Z=Xe.length;oe<Z;oe++)xe=Xe[oe],F?ce&&t.texSubImage2D(i.TEXTURE_2D,oe,0,0,xe.width,xe.height,le,Me,xe.data):t.texImage2D(i.TEXTURE_2D,oe,be,xe.width,xe.height,0,le,Me,xe.data);_.generateMipmaps=!1}else F?(fe&&t.texStorage2D(i.TEXTURE_2D,ye,be,re.width,re.height),ce&&Ke(_,re,le,Me)):t.texImage2D(i.TEXTURE_2D,0,be,re.width,re.height,0,le,Me,re.data);else if(_.isCompressedTexture)if(_.isCompressedArrayTexture){F&&fe&&t.texStorage3D(i.TEXTURE_2D_ARRAY,ye,be,Xe[0].width,Xe[0].height,re.depth);for(let oe=0,Z=Xe.length;oe<Z;oe++)if(xe=Xe[oe],_.format!==Fn)if(le!==null)if(F){if(ce)if(_.layerUpdates.size>0){const Ee=uh(xe.width,xe.height,_.format,_.type);for(const Be of _.layerUpdates){const mt=xe.data.subarray(Be*Ee/xe.data.BYTES_PER_ELEMENT,(Be+1)*Ee/xe.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,oe,0,0,Be,xe.width,xe.height,1,le,mt)}_.clearLayerUpdates()}else t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,oe,0,0,0,xe.width,xe.height,re.depth,le,xe.data)}else t.compressedTexImage3D(i.TEXTURE_2D_ARRAY,oe,be,xe.width,xe.height,re.depth,0,xe.data,0,0);else Fe("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else F?ce&&t.texSubImage3D(i.TEXTURE_2D_ARRAY,oe,0,0,0,xe.width,xe.height,re.depth,le,Me,xe.data):t.texImage3D(i.TEXTURE_2D_ARRAY,oe,be,xe.width,xe.height,re.depth,0,le,Me,xe.data)}else{F&&fe&&t.texStorage2D(i.TEXTURE_2D,ye,be,Xe[0].width,Xe[0].height);for(let oe=0,Z=Xe.length;oe<Z;oe++)xe=Xe[oe],_.format!==Fn?le!==null?F?ce&&t.compressedTexSubImage2D(i.TEXTURE_2D,oe,0,0,xe.width,xe.height,le,xe.data):t.compressedTexImage2D(i.TEXTURE_2D,oe,be,xe.width,xe.height,0,xe.data):Fe("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):F?ce&&t.texSubImage2D(i.TEXTURE_2D,oe,0,0,xe.width,xe.height,le,Me,xe.data):t.texImage2D(i.TEXTURE_2D,oe,be,xe.width,xe.height,0,le,Me,xe.data)}else if(_.isDataArrayTexture)if(F){if(fe&&t.texStorage3D(i.TEXTURE_2D_ARRAY,ye,be,re.width,re.height,re.depth),ce)if(_.layerUpdates.size>0){const oe=uh(re.width,re.height,_.format,_.type);for(const Z of _.layerUpdates){const Ee=re.data.subarray(Z*oe/re.data.BYTES_PER_ELEMENT,(Z+1)*oe/re.data.BYTES_PER_ELEMENT);t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,Z,re.width,re.height,1,le,Me,Ee)}_.clearLayerUpdates()}else t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,re.width,re.height,re.depth,le,Me,re.data)}else t.texImage3D(i.TEXTURE_2D_ARRAY,0,be,re.width,re.height,re.depth,0,le,Me,re.data);else if(_.isData3DTexture)F?(fe&&t.texStorage3D(i.TEXTURE_3D,ye,be,re.width,re.height,re.depth),ce&&t.texSubImage3D(i.TEXTURE_3D,0,0,0,0,re.width,re.height,re.depth,le,Me,re.data)):t.texImage3D(i.TEXTURE_3D,0,be,re.width,re.height,re.depth,0,le,Me,re.data);else if(_.isFramebufferTexture){if(fe)if(F)t.texStorage2D(i.TEXTURE_2D,ye,be,re.width,re.height);else{let oe=re.width,Z=re.height;for(let Ee=0;Ee<ye;Ee++)t.texImage2D(i.TEXTURE_2D,Ee,be,oe,Z,0,le,Me,null),oe>>=1,Z>>=1}}else if(Xe.length>0){if(F&&fe){const oe=Te(Xe[0]);t.texStorage2D(i.TEXTURE_2D,ye,be,oe.width,oe.height)}for(let oe=0,Z=Xe.length;oe<Z;oe++)xe=Xe[oe],F?ce&&t.texSubImage2D(i.TEXTURE_2D,oe,0,0,le,Me,xe):t.texImage2D(i.TEXTURE_2D,oe,be,le,Me,xe);_.generateMipmaps=!1}else if(F){if(fe){const oe=Te(re);t.texStorage2D(i.TEXTURE_2D,ye,be,oe.width,oe.height)}ce&&t.texSubImage2D(i.TEXTURE_2D,0,0,0,le,Me,re)}else t.texImage2D(i.TEXTURE_2D,0,be,le,Me,re);m(_)&&p(Q),Se.__version=K.version,_.onUpdate&&_.onUpdate(_)}T.__version=_.version}function ae(T,_,B){if(_.image.length!==6)return;const Q=Pe(T,_),te=_.source;t.bindTexture(i.TEXTURE_CUBE_MAP,T.__webglTexture,i.TEXTURE0+B);const K=n.get(te);if(te.version!==K.__version||Q===!0){t.activeTexture(i.TEXTURE0+B);const Se=et.getPrimaries(et.workingColorSpace),he=_.colorSpace===Pi?null:et.getPrimaries(_.colorSpace),De=_.colorSpace===Pi||Se===he?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,_.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,_.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,_.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,De);const Ne=_.isCompressedTexture||_.image[0].isCompressedTexture,re=_.image[0]&&_.image[0].isDataTexture,le=[];for(let Z=0;Z<6;Z++)!Ne&&!re?le[Z]=v(_.image[Z],!0,s.maxCubemapSize):le[Z]=re?_.image[Z].image:_.image[Z],le[Z]=pt(_,le[Z]);const Me=le[0],be=r.convert(_.format,_.colorSpace),xe=r.convert(_.type),Xe=w(_.internalFormat,be,xe,_.colorSpace),F=_.isVideoTexture!==!0,fe=K.__version===void 0||Q===!0,ce=te.dataReady;let ye=D(_,Me);ie(i.TEXTURE_CUBE_MAP,_);let oe;if(Ne){F&&fe&&t.texStorage2D(i.TEXTURE_CUBE_MAP,ye,Xe,Me.width,Me.height);for(let Z=0;Z<6;Z++){oe=le[Z].mipmaps;for(let Ee=0;Ee<oe.length;Ee++){const Be=oe[Ee];_.format!==Fn?be!==null?F?ce&&t.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Z,Ee,0,0,Be.width,Be.height,be,Be.data):t.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Z,Ee,Xe,Be.width,Be.height,0,Be.data):Fe("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):F?ce&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Z,Ee,0,0,Be.width,Be.height,be,xe,Be.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Z,Ee,Xe,Be.width,Be.height,0,be,xe,Be.data)}}}else{if(oe=_.mipmaps,F&&fe){oe.length>0&&ye++;const Z=Te(le[0]);t.texStorage2D(i.TEXTURE_CUBE_MAP,ye,Xe,Z.width,Z.height)}for(let Z=0;Z<6;Z++)if(re){F?ce&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Z,0,0,0,le[Z].width,le[Z].height,be,xe,le[Z].data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Z,0,Xe,le[Z].width,le[Z].height,0,be,xe,le[Z].data);for(let Ee=0;Ee<oe.length;Ee++){const mt=oe[Ee].image[Z].image;F?ce&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Z,Ee+1,0,0,mt.width,mt.height,be,xe,mt.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Z,Ee+1,Xe,mt.width,mt.height,0,be,xe,mt.data)}}else{F?ce&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Z,0,0,0,be,xe,le[Z]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Z,0,Xe,be,xe,le[Z]);for(let Ee=0;Ee<oe.length;Ee++){const Be=oe[Ee];F?ce&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Z,Ee+1,0,0,be,xe,Be.image[Z]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Z,Ee+1,Xe,be,xe,Be.image[Z])}}}m(_)&&p(i.TEXTURE_CUBE_MAP),K.__version=te.version,_.onUpdate&&_.onUpdate(_)}T.__version=_.version}function ue(T,_,B,Q,te,K){const Se=r.convert(B.format,B.colorSpace),he=r.convert(B.type),De=w(B.internalFormat,Se,he,B.colorSpace),Ne=n.get(_),re=n.get(B);if(re.__renderTarget=_,!Ne.__hasExternalTextures){const le=Math.max(1,_.width>>K),Me=Math.max(1,_.height>>K);te===i.TEXTURE_3D||te===i.TEXTURE_2D_ARRAY?t.texImage3D(te,K,De,le,Me,_.depth,0,Se,he,null):t.texImage2D(te,K,De,le,Me,0,Se,he,null)}t.bindFramebuffer(i.FRAMEBUFFER,T),Ut(_)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,Q,te,re.__webglTexture,0,N(_)):(te===i.TEXTURE_2D||te>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&te<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,Q,te,re.__webglTexture,K),t.bindFramebuffer(i.FRAMEBUFFER,null)}function ke(T,_,B){if(i.bindRenderbuffer(i.RENDERBUFFER,T),_.depthBuffer){const Q=_.depthTexture,te=Q&&Q.isDepthTexture?Q.type:null,K=M(_.stencilBuffer,te),Se=_.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;Ut(_)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,N(_),K,_.width,_.height):B?i.renderbufferStorageMultisample(i.RENDERBUFFER,N(_),K,_.width,_.height):i.renderbufferStorage(i.RENDERBUFFER,K,_.width,_.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,Se,i.RENDERBUFFER,T)}else{const Q=_.textures;for(let te=0;te<Q.length;te++){const K=Q[te],Se=r.convert(K.format,K.colorSpace),he=r.convert(K.type),De=w(K.internalFormat,Se,he,K.colorSpace);Ut(_)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,N(_),De,_.width,_.height):B?i.renderbufferStorageMultisample(i.RENDERBUFFER,N(_),De,_.width,_.height):i.renderbufferStorage(i.RENDERBUFFER,De,_.width,_.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function Ue(T,_,B){const Q=_.isWebGLCubeRenderTarget===!0;if(t.bindFramebuffer(i.FRAMEBUFFER,T),!(_.depthTexture&&_.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const te=n.get(_.depthTexture);if(te.__renderTarget=_,(!te.__webglTexture||_.depthTexture.image.width!==_.width||_.depthTexture.image.height!==_.height)&&(_.depthTexture.image.width=_.width,_.depthTexture.image.height=_.height,_.depthTexture.needsUpdate=!0),Q){if(te.__webglInit===void 0&&(te.__webglInit=!0,_.depthTexture.addEventListener("dispose",R)),te.__webglTexture===void 0){te.__webglTexture=i.createTexture(),t.bindTexture(i.TEXTURE_CUBE_MAP,te.__webglTexture),ie(i.TEXTURE_CUBE_MAP,_.depthTexture);const Ne=r.convert(_.depthTexture.format),re=r.convert(_.depthTexture.type);let le;_.depthTexture.format===xi?le=i.DEPTH_COMPONENT24:_.depthTexture.format===es&&(le=i.DEPTH24_STENCIL8);for(let Me=0;Me<6;Me++)i.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Me,0,le,_.width,_.height,0,Ne,re,null)}}else C(_.depthTexture,0);const K=te.__webglTexture,Se=N(_),he=Q?i.TEXTURE_CUBE_MAP_POSITIVE_X+B:i.TEXTURE_2D,De=_.depthTexture.format===es?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;if(_.depthTexture.format===xi)Ut(_)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,De,he,K,0,Se):i.framebufferTexture2D(i.FRAMEBUFFER,De,he,K,0);else if(_.depthTexture.format===es)Ut(_)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,De,he,K,0,Se):i.framebufferTexture2D(i.FRAMEBUFFER,De,he,K,0);else throw new Error("Unknown depthTexture format")}function Oe(T){const _=n.get(T),B=T.isWebGLCubeRenderTarget===!0;if(_.__boundDepthTexture!==T.depthTexture){const Q=T.depthTexture;if(_.__depthDisposeCallback&&_.__depthDisposeCallback(),Q){const te=()=>{delete _.__boundDepthTexture,delete _.__depthDisposeCallback,Q.removeEventListener("dispose",te)};Q.addEventListener("dispose",te),_.__depthDisposeCallback=te}_.__boundDepthTexture=Q}if(T.depthTexture&&!_.__autoAllocateDepthBuffer)if(B)for(let Q=0;Q<6;Q++)Ue(_.__webglFramebuffer[Q],T,Q);else{const Q=T.texture.mipmaps;Q&&Q.length>0?Ue(_.__webglFramebuffer[0],T,0):Ue(_.__webglFramebuffer,T,0)}else if(B){_.__webglDepthbuffer=[];for(let Q=0;Q<6;Q++)if(t.bindFramebuffer(i.FRAMEBUFFER,_.__webglFramebuffer[Q]),_.__webglDepthbuffer[Q]===void 0)_.__webglDepthbuffer[Q]=i.createRenderbuffer(),ke(_.__webglDepthbuffer[Q],T,!1);else{const te=T.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,K=_.__webglDepthbuffer[Q];i.bindRenderbuffer(i.RENDERBUFFER,K),i.framebufferRenderbuffer(i.FRAMEBUFFER,te,i.RENDERBUFFER,K)}}else{const Q=T.texture.mipmaps;if(Q&&Q.length>0?t.bindFramebuffer(i.FRAMEBUFFER,_.__webglFramebuffer[0]):t.bindFramebuffer(i.FRAMEBUFFER,_.__webglFramebuffer),_.__webglDepthbuffer===void 0)_.__webglDepthbuffer=i.createRenderbuffer(),ke(_.__webglDepthbuffer,T,!1);else{const te=T.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,K=_.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,K),i.framebufferRenderbuffer(i.FRAMEBUFFER,te,i.RENDERBUFFER,K)}}t.bindFramebuffer(i.FRAMEBUFFER,null)}function kt(T,_,B){const Q=n.get(T);_!==void 0&&ue(Q.__webglFramebuffer,T,T.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),B!==void 0&&Oe(T)}function Qe(T){const _=T.texture,B=n.get(T),Q=n.get(_);T.addEventListener("dispose",L);const te=T.textures,K=T.isWebGLCubeRenderTarget===!0,Se=te.length>1;if(Se||(Q.__webglTexture===void 0&&(Q.__webglTexture=i.createTexture()),Q.__version=_.version,a.memory.textures++),K){B.__webglFramebuffer=[];for(let he=0;he<6;he++)if(_.mipmaps&&_.mipmaps.length>0){B.__webglFramebuffer[he]=[];for(let De=0;De<_.mipmaps.length;De++)B.__webglFramebuffer[he][De]=i.createFramebuffer()}else B.__webglFramebuffer[he]=i.createFramebuffer()}else{if(_.mipmaps&&_.mipmaps.length>0){B.__webglFramebuffer=[];for(let he=0;he<_.mipmaps.length;he++)B.__webglFramebuffer[he]=i.createFramebuffer()}else B.__webglFramebuffer=i.createFramebuffer();if(Se)for(let he=0,De=te.length;he<De;he++){const Ne=n.get(te[he]);Ne.__webglTexture===void 0&&(Ne.__webglTexture=i.createTexture(),a.memory.textures++)}if(T.samples>0&&Ut(T)===!1){B.__webglMultisampledFramebuffer=i.createFramebuffer(),B.__webglColorRenderbuffer=[],t.bindFramebuffer(i.FRAMEBUFFER,B.__webglMultisampledFramebuffer);for(let he=0;he<te.length;he++){const De=te[he];B.__webglColorRenderbuffer[he]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,B.__webglColorRenderbuffer[he]);const Ne=r.convert(De.format,De.colorSpace),re=r.convert(De.type),le=w(De.internalFormat,Ne,re,De.colorSpace,T.isXRRenderTarget===!0),Me=N(T);i.renderbufferStorageMultisample(i.RENDERBUFFER,Me,le,T.width,T.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+he,i.RENDERBUFFER,B.__webglColorRenderbuffer[he])}i.bindRenderbuffer(i.RENDERBUFFER,null),T.depthBuffer&&(B.__webglDepthRenderbuffer=i.createRenderbuffer(),ke(B.__webglDepthRenderbuffer,T,!0)),t.bindFramebuffer(i.FRAMEBUFFER,null)}}if(K){t.bindTexture(i.TEXTURE_CUBE_MAP,Q.__webglTexture),ie(i.TEXTURE_CUBE_MAP,_);for(let he=0;he<6;he++)if(_.mipmaps&&_.mipmaps.length>0)for(let De=0;De<_.mipmaps.length;De++)ue(B.__webglFramebuffer[he][De],T,_,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+he,De);else ue(B.__webglFramebuffer[he],T,_,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+he,0);m(_)&&p(i.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(Se){for(let he=0,De=te.length;he<De;he++){const Ne=te[he],re=n.get(Ne);let le=i.TEXTURE_2D;(T.isWebGL3DRenderTarget||T.isWebGLArrayRenderTarget)&&(le=T.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(le,re.__webglTexture),ie(le,Ne),ue(B.__webglFramebuffer,T,Ne,i.COLOR_ATTACHMENT0+he,le,0),m(Ne)&&p(le)}t.unbindTexture()}else{let he=i.TEXTURE_2D;if((T.isWebGL3DRenderTarget||T.isWebGLArrayRenderTarget)&&(he=T.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(he,Q.__webglTexture),ie(he,_),_.mipmaps&&_.mipmaps.length>0)for(let De=0;De<_.mipmaps.length;De++)ue(B.__webglFramebuffer[De],T,_,i.COLOR_ATTACHMENT0,he,De);else ue(B.__webglFramebuffer,T,_,i.COLOR_ATTACHMENT0,he,0);m(_)&&p(he),t.unbindTexture()}T.depthBuffer&&Oe(T)}function st(T){const _=T.textures;for(let B=0,Q=_.length;B<Q;B++){const te=_[B];if(m(te)){const K=y(T),Se=n.get(te).__webglTexture;t.bindTexture(K,Se),p(K),t.unbindTexture()}}}const ut=[],We=[];function At(T){if(T.samples>0){if(Ut(T)===!1){const _=T.textures,B=T.width,Q=T.height;let te=i.COLOR_BUFFER_BIT;const K=T.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,Se=n.get(T),he=_.length>1;if(he)for(let Ne=0;Ne<_.length;Ne++)t.bindFramebuffer(i.FRAMEBUFFER,Se.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+Ne,i.RENDERBUFFER,null),t.bindFramebuffer(i.FRAMEBUFFER,Se.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+Ne,i.TEXTURE_2D,null,0);t.bindFramebuffer(i.READ_FRAMEBUFFER,Se.__webglMultisampledFramebuffer);const De=T.texture.mipmaps;De&&De.length>0?t.bindFramebuffer(i.DRAW_FRAMEBUFFER,Se.__webglFramebuffer[0]):t.bindFramebuffer(i.DRAW_FRAMEBUFFER,Se.__webglFramebuffer);for(let Ne=0;Ne<_.length;Ne++){if(T.resolveDepthBuffer&&(T.depthBuffer&&(te|=i.DEPTH_BUFFER_BIT),T.stencilBuffer&&T.resolveStencilBuffer&&(te|=i.STENCIL_BUFFER_BIT)),he){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,Se.__webglColorRenderbuffer[Ne]);const re=n.get(_[Ne]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,re,0)}i.blitFramebuffer(0,0,B,Q,0,0,B,Q,te,i.NEAREST),l===!0&&(ut.length=0,We.length=0,ut.push(i.COLOR_ATTACHMENT0+Ne),T.depthBuffer&&T.resolveDepthBuffer===!1&&(ut.push(K),We.push(K),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,We)),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,ut))}if(t.bindFramebuffer(i.READ_FRAMEBUFFER,null),t.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),he)for(let Ne=0;Ne<_.length;Ne++){t.bindFramebuffer(i.FRAMEBUFFER,Se.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+Ne,i.RENDERBUFFER,Se.__webglColorRenderbuffer[Ne]);const re=n.get(_[Ne]).__webglTexture;t.bindFramebuffer(i.FRAMEBUFFER,Se.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+Ne,i.TEXTURE_2D,re,0)}t.bindFramebuffer(i.DRAW_FRAMEBUFFER,Se.__webglMultisampledFramebuffer)}else if(T.depthBuffer&&T.resolveDepthBuffer===!1&&l){const _=T.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[_])}}}function N(T){return Math.min(s.maxSamples,T.samples)}function Ut(T){const _=n.get(T);return T.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&_.__useRenderToTexture!==!1}function it(T){const _=a.render.frame;h.get(T)!==_&&(h.set(T,_),T.update())}function pt(T,_){const B=T.colorSpace,Q=T.format,te=T.type;return T.isCompressedTexture===!0||T.isVideoTexture===!0||B!==Vs&&B!==Pi&&(et.getTransfer(B)===at?(Q!==Fn||te!==yn)&&Fe("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):Je("WebGLTextures: Unsupported texture color space:",B)),_}function Te(T){return typeof HTMLImageElement<"u"&&T instanceof HTMLImageElement?(c.width=T.naturalWidth||T.width,c.height=T.naturalHeight||T.height):typeof VideoFrame<"u"&&T instanceof VideoFrame?(c.width=T.displayWidth,c.height=T.displayHeight):(c.width=T.width,c.height=T.height),c}this.allocateTextureUnit=b,this.resetTextureUnits=G,this.setTexture2D=C,this.setTexture2DArray=P,this.setTexture3D=A,this.setTextureCube=q,this.rebindTextures=kt,this.setupRenderTarget=Qe,this.updateRenderTargetMipmap=st,this.updateMultisampleRenderTarget=At,this.setupDepthRenderbuffer=Oe,this.setupFrameBufferTexture=ue,this.useMultisampledRTT=Ut,this.isReversedDepthBuffer=function(){return t.buffers.depth.getReversed()}}function tx(i,e){function t(n,s=Pi){let r;const a=et.getTransfer(s);if(n===yn)return i.UNSIGNED_BYTE;if(n===Bl)return i.UNSIGNED_SHORT_4_4_4_4;if(n===zl)return i.UNSIGNED_SHORT_5_5_5_1;if(n===Mf)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===Ef)return i.UNSIGNED_INT_10F_11F_11F_REV;if(n===yf)return i.BYTE;if(n===Sf)return i.SHORT;if(n===pr)return i.UNSIGNED_SHORT;if(n===Ol)return i.INT;if(n===Qn)return i.UNSIGNED_INT;if(n===$n)return i.FLOAT;if(n===_i)return i.HALF_FLOAT;if(n===bf)return i.ALPHA;if(n===wf)return i.RGB;if(n===Fn)return i.RGBA;if(n===xi)return i.DEPTH_COMPONENT;if(n===es)return i.DEPTH_STENCIL;if(n===Tf)return i.RED;if(n===kl)return i.RED_INTEGER;if(n===ks)return i.RG;if(n===Vl)return i.RG_INTEGER;if(n===Gl)return i.RGBA_INTEGER;if(n===ca||n===ha||n===fa||n===ua)if(a===at)if(r=e.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===ca)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===ha)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===fa)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===ua)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=e.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===ca)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===ha)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===fa)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===ua)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===Bo||n===zo||n===ko||n===Vo)if(r=e.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===Bo)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===zo)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===ko)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===Vo)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===Go||n===Ho||n===Wo||n===Xo||n===$o||n===Yo||n===qo)if(r=e.get("WEBGL_compressed_texture_etc"),r!==null){if(n===Go||n===Ho)return a===at?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===Wo)return a===at?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC;if(n===Xo)return r.COMPRESSED_R11_EAC;if(n===$o)return r.COMPRESSED_SIGNED_R11_EAC;if(n===Yo)return r.COMPRESSED_RG11_EAC;if(n===qo)return r.COMPRESSED_SIGNED_RG11_EAC}else return null;if(n===jo||n===Zo||n===Ko||n===Jo||n===Qo||n===el||n===tl||n===nl||n===il||n===sl||n===rl||n===al||n===ol||n===ll)if(r=e.get("WEBGL_compressed_texture_astc"),r!==null){if(n===jo)return a===at?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===Zo)return a===at?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===Ko)return a===at?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===Jo)return a===at?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===Qo)return a===at?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===el)return a===at?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===tl)return a===at?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===nl)return a===at?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===il)return a===at?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===sl)return a===at?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===rl)return a===at?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===al)return a===at?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===ol)return a===at?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===ll)return a===at?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===cl||n===hl||n===fl)if(r=e.get("EXT_texture_compression_bptc"),r!==null){if(n===cl)return a===at?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===hl)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===fl)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===ul||n===dl||n===pl||n===ml)if(r=e.get("EXT_texture_compression_rgtc"),r!==null){if(n===ul)return r.COMPRESSED_RED_RGTC1_EXT;if(n===dl)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===pl)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===ml)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===mr?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:t}}const nx=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,ix=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;class sx{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){const n=new Bf(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=n}}getMesh(e){if(this.texture!==null&&this.mesh===null){const t=e.cameras[0].viewport,n=new ti({vertexShader:nx,fragmentShader:ix,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new Ie(new An(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class rx extends as{constructor(e,t){super();const n=this;let s=null,r=1,a=null,o="local-floor",l=1,c=null,h=null,u=null,f=null,d=null,g=null;const v=typeof XRWebGLBinding<"u",m=new sx,p={},y=t.getContextAttributes();let w=null,M=null;const D=[],R=[],L=new Le;let x=null;const E=new hn;E.viewport=new Tt;const X=new hn;X.viewport=new Tt;const I=[E,X],G=new dp;let b=null,U=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(J){let ae=D[J];return ae===void 0&&(ae=new Za,D[J]=ae),ae.getTargetRaySpace()},this.getControllerGrip=function(J){let ae=D[J];return ae===void 0&&(ae=new Za,D[J]=ae),ae.getGripSpace()},this.getHand=function(J){let ae=D[J];return ae===void 0&&(ae=new Za,D[J]=ae),ae.getHandSpace()};function C(J){const ae=R.indexOf(J.inputSource);if(ae===-1)return;const ue=D[ae];ue!==void 0&&(ue.update(J.inputSource,J.frame,c||a),ue.dispatchEvent({type:J.type,data:J.inputSource}))}function P(){s.removeEventListener("select",C),s.removeEventListener("selectstart",C),s.removeEventListener("selectend",C),s.removeEventListener("squeeze",C),s.removeEventListener("squeezestart",C),s.removeEventListener("squeezeend",C),s.removeEventListener("end",P),s.removeEventListener("inputsourceschange",A);for(let J=0;J<D.length;J++){const ae=R[J];ae!==null&&(R[J]=null,D[J].disconnect(ae))}b=null,U=null,m.reset();for(const J in p)delete p[J];e.setRenderTarget(w),d=null,f=null,u=null,s=null,M=null,Ke.stop(),n.isPresenting=!1,e.setPixelRatio(x),e.setSize(L.width,L.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(J){r=J,n.isPresenting===!0&&Fe("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(J){o=J,n.isPresenting===!0&&Fe("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||a},this.setReferenceSpace=function(J){c=J},this.getBaseLayer=function(){return f!==null?f:d},this.getBinding=function(){return u===null&&v&&(u=new XRWebGLBinding(s,t)),u},this.getFrame=function(){return g},this.getSession=function(){return s},this.setSession=async function(J){if(s=J,s!==null){if(w=e.getRenderTarget(),s.addEventListener("select",C),s.addEventListener("selectstart",C),s.addEventListener("selectend",C),s.addEventListener("squeeze",C),s.addEventListener("squeezestart",C),s.addEventListener("squeezeend",C),s.addEventListener("end",P),s.addEventListener("inputsourceschange",A),y.xrCompatible!==!0&&await t.makeXRCompatible(),x=e.getPixelRatio(),e.getSize(L),v&&"createProjectionLayer"in XRWebGLBinding.prototype){let ue=null,ke=null,Ue=null;y.depth&&(Ue=y.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,ue=y.stencil?es:xi,ke=y.stencil?mr:Qn);const Oe={colorFormat:t.RGBA8,depthFormat:Ue,scaleFactor:r};u=this.getBinding(),f=u.createProjectionLayer(Oe),s.updateRenderState({layers:[f]}),e.setPixelRatio(1),e.setSize(f.textureWidth,f.textureHeight,!1),M=new jn(f.textureWidth,f.textureHeight,{format:Fn,type:yn,depthTexture:new _r(f.textureWidth,f.textureHeight,ke,void 0,void 0,void 0,void 0,void 0,void 0,ue),stencilBuffer:y.stencil,colorSpace:e.outputColorSpace,samples:y.antialias?4:0,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1})}else{const ue={antialias:y.antialias,alpha:!0,depth:y.depth,stencil:y.stencil,framebufferScaleFactor:r};d=new XRWebGLLayer(s,t,ue),s.updateRenderState({baseLayer:d}),e.setPixelRatio(1),e.setSize(d.framebufferWidth,d.framebufferHeight,!1),M=new jn(d.framebufferWidth,d.framebufferHeight,{format:Fn,type:yn,colorSpace:e.outputColorSpace,stencilBuffer:y.stencil,resolveDepthBuffer:d.ignoreDepthValues===!1,resolveStencilBuffer:d.ignoreDepthValues===!1})}M.isXRRenderTarget=!0,this.setFoveation(l),c=null,a=await s.requestReferenceSpace(o),Ke.setContext(s),Ke.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return m.getDepthTexture()};function A(J){for(let ae=0;ae<J.removed.length;ae++){const ue=J.removed[ae],ke=R.indexOf(ue);ke>=0&&(R[ke]=null,D[ke].disconnect(ue))}for(let ae=0;ae<J.added.length;ae++){const ue=J.added[ae];let ke=R.indexOf(ue);if(ke===-1){for(let Oe=0;Oe<D.length;Oe++)if(Oe>=R.length){R.push(ue),ke=Oe;break}else if(R[Oe]===null){R[Oe]=ue,ke=Oe;break}if(ke===-1)break}const Ue=D[ke];Ue&&Ue.connect(ue)}}const q=new O,j=new O;function ee(J,ae,ue){q.setFromMatrixPosition(ae.matrixWorld),j.setFromMatrixPosition(ue.matrixWorld);const ke=q.distanceTo(j),Ue=ae.projectionMatrix.elements,Oe=ue.projectionMatrix.elements,kt=Ue[14]/(Ue[10]-1),Qe=Ue[14]/(Ue[10]+1),st=(Ue[9]+1)/Ue[5],ut=(Ue[9]-1)/Ue[5],We=(Ue[8]-1)/Ue[0],At=(Oe[8]+1)/Oe[0],N=kt*We,Ut=kt*At,it=ke/(-We+At),pt=it*-We;if(ae.matrixWorld.decompose(J.position,J.quaternion,J.scale),J.translateX(pt),J.translateZ(it),J.matrixWorld.compose(J.position,J.quaternion,J.scale),J.matrixWorldInverse.copy(J.matrixWorld).invert(),Ue[10]===-1)J.projectionMatrix.copy(ae.projectionMatrix),J.projectionMatrixInverse.copy(ae.projectionMatrixInverse);else{const Te=kt+it,T=Qe+it,_=N-pt,B=Ut+(ke-pt),Q=st*Qe/T*Te,te=ut*Qe/T*Te;J.projectionMatrix.makePerspective(_,B,Q,te,Te,T),J.projectionMatrixInverse.copy(J.projectionMatrix).invert()}}function se(J,ae){ae===null?J.matrixWorld.copy(J.matrix):J.matrixWorld.multiplyMatrices(ae.matrixWorld,J.matrix),J.matrixWorldInverse.copy(J.matrixWorld).invert()}this.updateCamera=function(J){if(s===null)return;let ae=J.near,ue=J.far;m.texture!==null&&(m.depthNear>0&&(ae=m.depthNear),m.depthFar>0&&(ue=m.depthFar)),G.near=X.near=E.near=ae,G.far=X.far=E.far=ue,(b!==G.near||U!==G.far)&&(s.updateRenderState({depthNear:G.near,depthFar:G.far}),b=G.near,U=G.far),G.layers.mask=J.layers.mask|6,E.layers.mask=G.layers.mask&-5,X.layers.mask=G.layers.mask&-3;const ke=J.parent,Ue=G.cameras;se(G,ke);for(let Oe=0;Oe<Ue.length;Oe++)se(Ue[Oe],ke);Ue.length===2?ee(G,E,X):G.projectionMatrix.copy(E.projectionMatrix),ie(J,G,ke)};function ie(J,ae,ue){ue===null?J.matrix.copy(ae.matrixWorld):(J.matrix.copy(ue.matrixWorld),J.matrix.invert(),J.matrix.multiply(ae.matrixWorld)),J.matrix.decompose(J.position,J.quaternion,J.scale),J.updateMatrixWorld(!0),J.projectionMatrix.copy(ae.projectionMatrix),J.projectionMatrixInverse.copy(ae.projectionMatrixInverse),J.isPerspectiveCamera&&(J.fov=_l*2*Math.atan(1/J.projectionMatrix.elements[5]),J.zoom=1)}this.getCamera=function(){return G},this.getFoveation=function(){if(!(f===null&&d===null))return l},this.setFoveation=function(J){l=J,f!==null&&(f.fixedFoveation=J),d!==null&&d.fixedFoveation!==void 0&&(d.fixedFoveation=J)},this.hasDepthSensing=function(){return m.texture!==null},this.getDepthSensingMesh=function(){return m.getMesh(G)},this.getCameraTexture=function(J){return p[J]};let Pe=null;function qe(J,ae){if(h=ae.getViewerPose(c||a),g=ae,h!==null){const ue=h.views;d!==null&&(e.setRenderTargetFramebuffer(M,d.framebuffer),e.setRenderTarget(M));let ke=!1;ue.length!==G.cameras.length&&(G.cameras.length=0,ke=!0);for(let Qe=0;Qe<ue.length;Qe++){const st=ue[Qe];let ut=null;if(d!==null)ut=d.getViewport(st);else{const At=u.getViewSubImage(f,st);ut=At.viewport,Qe===0&&(e.setRenderTargetTextures(M,At.colorTexture,At.depthStencilTexture),e.setRenderTarget(M))}let We=I[Qe];We===void 0&&(We=new hn,We.layers.enable(Qe),We.viewport=new Tt,I[Qe]=We),We.matrix.fromArray(st.transform.matrix),We.matrix.decompose(We.position,We.quaternion,We.scale),We.projectionMatrix.fromArray(st.projectionMatrix),We.projectionMatrixInverse.copy(We.projectionMatrix).invert(),We.viewport.set(ut.x,ut.y,ut.width,ut.height),Qe===0&&(G.matrix.copy(We.matrix),G.matrix.decompose(G.position,G.quaternion,G.scale)),ke===!0&&G.cameras.push(We)}const Ue=s.enabledFeatures;if(Ue&&Ue.includes("depth-sensing")&&s.depthUsage=="gpu-optimized"&&v){u=n.getBinding();const Qe=u.getDepthInformation(ue[0]);Qe&&Qe.isValid&&Qe.texture&&m.init(Qe,s.renderState)}if(Ue&&Ue.includes("camera-access")&&v){e.state.unbindTexture(),u=n.getBinding();for(let Qe=0;Qe<ue.length;Qe++){const st=ue[Qe].camera;if(st){let ut=p[st];ut||(ut=new Bf,p[st]=ut);const We=u.getCameraImage(st);ut.sourceTexture=We}}}}for(let ue=0;ue<D.length;ue++){const ke=R[ue],Ue=D[ue];ke!==null&&Ue!==void 0&&Ue.update(ke,ae,c||a)}Pe&&Pe(J,ae),ae.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:ae}),g=null}const Ke=new Wf;Ke.setAnimationLoop(qe),this.setAnimationLoop=function(J){Pe=J},this.dispose=function(){}}}const Yi=new ei,ax=new xt;function ox(i,e){function t(m,p){m.matrixAutoUpdate===!0&&m.updateMatrix(),p.value.copy(m.matrix)}function n(m,p){p.color.getRGB(m.fogColor.value,zf(i)),p.isFog?(m.fogNear.value=p.near,m.fogFar.value=p.far):p.isFogExp2&&(m.fogDensity.value=p.density)}function s(m,p,y,w,M){p.isMeshBasicMaterial?r(m,p):p.isMeshLambertMaterial?(r(m,p),p.envMap&&(m.envMapIntensity.value=p.envMapIntensity)):p.isMeshToonMaterial?(r(m,p),u(m,p)):p.isMeshPhongMaterial?(r(m,p),h(m,p),p.envMap&&(m.envMapIntensity.value=p.envMapIntensity)):p.isMeshStandardMaterial?(r(m,p),f(m,p),p.isMeshPhysicalMaterial&&d(m,p,M)):p.isMeshMatcapMaterial?(r(m,p),g(m,p)):p.isMeshDepthMaterial?r(m,p):p.isMeshDistanceMaterial?(r(m,p),v(m,p)):p.isMeshNormalMaterial?r(m,p):p.isLineBasicMaterial?(a(m,p),p.isLineDashedMaterial&&o(m,p)):p.isPointsMaterial?l(m,p,y,w):p.isSpriteMaterial?c(m,p):p.isShadowMaterial?(m.color.value.copy(p.color),m.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function r(m,p){m.opacity.value=p.opacity,p.color&&m.diffuse.value.copy(p.color),p.emissive&&m.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(m.map.value=p.map,t(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.bumpMap&&(m.bumpMap.value=p.bumpMap,t(p.bumpMap,m.bumpMapTransform),m.bumpScale.value=p.bumpScale,p.side===un&&(m.bumpScale.value*=-1)),p.normalMap&&(m.normalMap.value=p.normalMap,t(p.normalMap,m.normalMapTransform),m.normalScale.value.copy(p.normalScale),p.side===un&&m.normalScale.value.negate()),p.displacementMap&&(m.displacementMap.value=p.displacementMap,t(p.displacementMap,m.displacementMapTransform),m.displacementScale.value=p.displacementScale,m.displacementBias.value=p.displacementBias),p.emissiveMap&&(m.emissiveMap.value=p.emissiveMap,t(p.emissiveMap,m.emissiveMapTransform)),p.specularMap&&(m.specularMap.value=p.specularMap,t(p.specularMap,m.specularMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest);const y=e.get(p),w=y.envMap,M=y.envMapRotation;w&&(m.envMap.value=w,Yi.copy(M),Yi.x*=-1,Yi.y*=-1,Yi.z*=-1,w.isCubeTexture&&w.isRenderTargetTexture===!1&&(Yi.y*=-1,Yi.z*=-1),m.envMapRotation.value.setFromMatrix4(ax.makeRotationFromEuler(Yi)),m.flipEnvMap.value=w.isCubeTexture&&w.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=p.reflectivity,m.ior.value=p.ior,m.refractionRatio.value=p.refractionRatio),p.lightMap&&(m.lightMap.value=p.lightMap,m.lightMapIntensity.value=p.lightMapIntensity,t(p.lightMap,m.lightMapTransform)),p.aoMap&&(m.aoMap.value=p.aoMap,m.aoMapIntensity.value=p.aoMapIntensity,t(p.aoMap,m.aoMapTransform))}function a(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,p.map&&(m.map.value=p.map,t(p.map,m.mapTransform))}function o(m,p){m.dashSize.value=p.dashSize,m.totalSize.value=p.dashSize+p.gapSize,m.scale.value=p.scale}function l(m,p,y,w){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.size.value=p.size*y,m.scale.value=w*.5,p.map&&(m.map.value=p.map,t(p.map,m.uvTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function c(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.rotation.value=p.rotation,p.map&&(m.map.value=p.map,t(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function h(m,p){m.specular.value.copy(p.specular),m.shininess.value=Math.max(p.shininess,1e-4)}function u(m,p){p.gradientMap&&(m.gradientMap.value=p.gradientMap)}function f(m,p){m.metalness.value=p.metalness,p.metalnessMap&&(m.metalnessMap.value=p.metalnessMap,t(p.metalnessMap,m.metalnessMapTransform)),m.roughness.value=p.roughness,p.roughnessMap&&(m.roughnessMap.value=p.roughnessMap,t(p.roughnessMap,m.roughnessMapTransform)),p.envMap&&(m.envMapIntensity.value=p.envMapIntensity)}function d(m,p,y){m.ior.value=p.ior,p.sheen>0&&(m.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),m.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(m.sheenColorMap.value=p.sheenColorMap,t(p.sheenColorMap,m.sheenColorMapTransform)),p.sheenRoughnessMap&&(m.sheenRoughnessMap.value=p.sheenRoughnessMap,t(p.sheenRoughnessMap,m.sheenRoughnessMapTransform))),p.clearcoat>0&&(m.clearcoat.value=p.clearcoat,m.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(m.clearcoatMap.value=p.clearcoatMap,t(p.clearcoatMap,m.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,t(p.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(m.clearcoatNormalMap.value=p.clearcoatNormalMap,t(p.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===un&&m.clearcoatNormalScale.value.negate())),p.dispersion>0&&(m.dispersion.value=p.dispersion),p.iridescence>0&&(m.iridescence.value=p.iridescence,m.iridescenceIOR.value=p.iridescenceIOR,m.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(m.iridescenceMap.value=p.iridescenceMap,t(p.iridescenceMap,m.iridescenceMapTransform)),p.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=p.iridescenceThicknessMap,t(p.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),p.transmission>0&&(m.transmission.value=p.transmission,m.transmissionSamplerMap.value=y.texture,m.transmissionSamplerSize.value.set(y.width,y.height),p.transmissionMap&&(m.transmissionMap.value=p.transmissionMap,t(p.transmissionMap,m.transmissionMapTransform)),m.thickness.value=p.thickness,p.thicknessMap&&(m.thicknessMap.value=p.thicknessMap,t(p.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=p.attenuationDistance,m.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(m.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(m.anisotropyMap.value=p.anisotropyMap,t(p.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=p.specularIntensity,m.specularColor.value.copy(p.specularColor),p.specularColorMap&&(m.specularColorMap.value=p.specularColorMap,t(p.specularColorMap,m.specularColorMapTransform)),p.specularIntensityMap&&(m.specularIntensityMap.value=p.specularIntensityMap,t(p.specularIntensityMap,m.specularIntensityMapTransform))}function g(m,p){p.matcap&&(m.matcap.value=p.matcap)}function v(m,p){const y=e.get(p).light;m.referencePosition.value.setFromMatrixPosition(y.matrixWorld),m.nearDistance.value=y.shadow.camera.near,m.farDistance.value=y.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:s}}function lx(i,e,t,n){let s={},r={},a=[];const o=i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);function l(y,w){const M=w.program;n.uniformBlockBinding(y,M)}function c(y,w){let M=s[y.id];M===void 0&&(g(y),M=h(y),s[y.id]=M,y.addEventListener("dispose",m));const D=w.program;n.updateUBOMapping(y,D);const R=e.render.frame;r[y.id]!==R&&(f(y),r[y.id]=R)}function h(y){const w=u();y.__bindingPointIndex=w;const M=i.createBuffer(),D=y.__size,R=y.usage;return i.bindBuffer(i.UNIFORM_BUFFER,M),i.bufferData(i.UNIFORM_BUFFER,D,R),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,w,M),M}function u(){for(let y=0;y<o;y++)if(a.indexOf(y)===-1)return a.push(y),y;return Je("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function f(y){const w=s[y.id],M=y.uniforms,D=y.__cache;i.bindBuffer(i.UNIFORM_BUFFER,w);for(let R=0,L=M.length;R<L;R++){const x=Array.isArray(M[R])?M[R]:[M[R]];for(let E=0,X=x.length;E<X;E++){const I=x[E];if(d(I,R,E,D)===!0){const G=I.__offset,b=Array.isArray(I.value)?I.value:[I.value];let U=0;for(let C=0;C<b.length;C++){const P=b[C],A=v(P);typeof P=="number"||typeof P=="boolean"?(I.__data[0]=P,i.bufferSubData(i.UNIFORM_BUFFER,G+U,I.__data)):P.isMatrix3?(I.__data[0]=P.elements[0],I.__data[1]=P.elements[1],I.__data[2]=P.elements[2],I.__data[3]=0,I.__data[4]=P.elements[3],I.__data[5]=P.elements[4],I.__data[6]=P.elements[5],I.__data[7]=0,I.__data[8]=P.elements[6],I.__data[9]=P.elements[7],I.__data[10]=P.elements[8],I.__data[11]=0):(P.toArray(I.__data,U),U+=A.storage/Float32Array.BYTES_PER_ELEMENT)}i.bufferSubData(i.UNIFORM_BUFFER,G,I.__data)}}}i.bindBuffer(i.UNIFORM_BUFFER,null)}function d(y,w,M,D){const R=y.value,L=w+"_"+M;if(D[L]===void 0)return typeof R=="number"||typeof R=="boolean"?D[L]=R:D[L]=R.clone(),!0;{const x=D[L];if(typeof R=="number"||typeof R=="boolean"){if(x!==R)return D[L]=R,!0}else if(x.equals(R)===!1)return x.copy(R),!0}return!1}function g(y){const w=y.uniforms;let M=0;const D=16;for(let L=0,x=w.length;L<x;L++){const E=Array.isArray(w[L])?w[L]:[w[L]];for(let X=0,I=E.length;X<I;X++){const G=E[X],b=Array.isArray(G.value)?G.value:[G.value];for(let U=0,C=b.length;U<C;U++){const P=b[U],A=v(P),q=M%D,j=q%A.boundary,ee=q+j;M+=j,ee!==0&&D-ee<A.storage&&(M+=D-ee),G.__data=new Float32Array(A.storage/Float32Array.BYTES_PER_ELEMENT),G.__offset=M,M+=A.storage}}}const R=M%D;return R>0&&(M+=D-R),y.__size=M,y.__cache={},this}function v(y){const w={boundary:0,storage:0};return typeof y=="number"||typeof y=="boolean"?(w.boundary=4,w.storage=4):y.isVector2?(w.boundary=8,w.storage=8):y.isVector3||y.isColor?(w.boundary=16,w.storage=12):y.isVector4?(w.boundary=16,w.storage=16):y.isMatrix3?(w.boundary=48,w.storage=48):y.isMatrix4?(w.boundary=64,w.storage=64):y.isTexture?Fe("WebGLRenderer: Texture samplers can not be part of an uniforms group."):Fe("WebGLRenderer: Unsupported uniform value type.",y),w}function m(y){const w=y.target;w.removeEventListener("dispose",m);const M=a.indexOf(w.__bindingPointIndex);a.splice(M,1),i.deleteBuffer(s[w.id]),delete s[w.id],delete r[w.id]}function p(){for(const y in s)i.deleteBuffer(s[y]);a=[],s={},r={}}return{bind:l,update:c,dispose:p}}const cx=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]);let kn=null;function hx(){return kn===null&&(kn=new Kd(cx,16,16,ks,_i),kn.name="DFG_LUT",kn.minFilter=$t,kn.magFilter=$t,kn.wrapS=di,kn.wrapT=di,kn.generateMipmaps=!1,kn.needsUpdate=!0),kn}class Zf{constructor(e={}){const{canvas:t=Ad(),context:n=null,depth:s=!0,stencil:r=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:u=!1,reversedDepthBuffer:f=!1,outputBufferType:d=yn}=e;this.isWebGLRenderer=!0;let g;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");g=n.getContextAttributes().alpha}else g=a;const v=d,m=new Set([Gl,Vl,kl]),p=new Set([yn,Qn,pr,mr,Bl,zl]),y=new Uint32Array(4),w=new Int32Array(4);let M=null,D=null;const R=[],L=[];let x=null;this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=qn,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const E=this;let X=!1;this._outputColorSpace=Tn;let I=0,G=0,b=null,U=-1,C=null;const P=new Tt,A=new Tt;let q=null;const j=new He(0);let ee=0,se=t.width,ie=t.height,Pe=1,qe=null,Ke=null;const J=new Tt(0,0,se,ie),ae=new Tt(0,0,se,ie);let ue=!1;const ke=new ql;let Ue=!1,Oe=!1;const kt=new xt,Qe=new O,st=new Tt,ut={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let We=!1;function At(){return b===null?Pe:1}let N=n;function Ut(S,V){return t.getContext(S,V)}try{const S={alpha:!0,depth:s,stencil:r,antialias:o,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:h,failIfMajorPerformanceCaveat:u};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${Fl}`),t.addEventListener("webglcontextlost",Ee,!1),t.addEventListener("webglcontextrestored",Be,!1),t.addEventListener("webglcontextcreationerror",mt,!1),N===null){const V="webgl2";if(N=Ut(V,S),N===null)throw Ut(V)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(S){throw Je("WebGLRenderer: "+S.message),S}let it,pt,Te,T,_,B,Q,te,K,Se,he,De,Ne,re,le,Me,be,xe,Xe,F,fe,ce,ye;function oe(){it=new f0(N),it.init(),fe=new tx(N,it),pt=new i0(N,it,e,fe),Te=new Q_(N,it),pt.reversedDepthBuffer&&f&&Te.buffers.depth.setReversed(!0),T=new p0(N),_=new z_,B=new ex(N,it,Te,_,pt,fe,T),Q=new h0(E),te=new vp(N),ce=new t0(N,te),K=new u0(N,te,T,ce),Se=new g0(N,K,te,ce,T),xe=new m0(N,pt,B),le=new s0(_),he=new B_(E,Q,it,pt,ce,le),De=new ox(E,_),Ne=new V_,re=new Y_(it),be=new e0(E,Q,Te,Se,g,l),Me=new J_(E,Se,pt),ye=new lx(N,T,pt,Te),Xe=new n0(N,it,T),F=new d0(N,it,T),T.programs=he.programs,E.capabilities=pt,E.extensions=it,E.properties=_,E.renderLists=Ne,E.shadowMap=Me,E.state=Te,E.info=T}oe(),v!==yn&&(x=new x0(v,t.width,t.height,s,r));const Z=new rx(E,N);this.xr=Z,this.getContext=function(){return N},this.getContextAttributes=function(){return N.getContextAttributes()},this.forceContextLoss=function(){const S=it.get("WEBGL_lose_context");S&&S.loseContext()},this.forceContextRestore=function(){const S=it.get("WEBGL_lose_context");S&&S.restoreContext()},this.getPixelRatio=function(){return Pe},this.setPixelRatio=function(S){S!==void 0&&(Pe=S,this.setSize(se,ie,!1))},this.getSize=function(S){return S.set(se,ie)},this.setSize=function(S,V,Y=!0){if(Z.isPresenting){Fe("WebGLRenderer: Can't change size while VR device is presenting.");return}se=S,ie=V,t.width=Math.floor(S*Pe),t.height=Math.floor(V*Pe),Y===!0&&(t.style.width=S+"px",t.style.height=V+"px"),x!==null&&x.setSize(t.width,t.height),this.setViewport(0,0,S,V)},this.getDrawingBufferSize=function(S){return S.set(se*Pe,ie*Pe).floor()},this.setDrawingBufferSize=function(S,V,Y){se=S,ie=V,Pe=Y,t.width=Math.floor(S*Y),t.height=Math.floor(V*Y),this.setViewport(0,0,S,V)},this.setEffects=function(S){if(v===yn){console.error("THREE.WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(S){for(let V=0;V<S.length;V++)if(S[V].isOutputPass===!0){console.warn("THREE.WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}x.setEffects(S||[])},this.getCurrentViewport=function(S){return S.copy(P)},this.getViewport=function(S){return S.copy(J)},this.setViewport=function(S,V,Y,$){S.isVector4?J.set(S.x,S.y,S.z,S.w):J.set(S,V,Y,$),Te.viewport(P.copy(J).multiplyScalar(Pe).round())},this.getScissor=function(S){return S.copy(ae)},this.setScissor=function(S,V,Y,$){S.isVector4?ae.set(S.x,S.y,S.z,S.w):ae.set(S,V,Y,$),Te.scissor(A.copy(ae).multiplyScalar(Pe).round())},this.getScissorTest=function(){return ue},this.setScissorTest=function(S){Te.setScissorTest(ue=S)},this.setOpaqueSort=function(S){qe=S},this.setTransparentSort=function(S){Ke=S},this.getClearColor=function(S){return S.copy(be.getClearColor())},this.setClearColor=function(){be.setClearColor(...arguments)},this.getClearAlpha=function(){return be.getClearAlpha()},this.setClearAlpha=function(){be.setClearAlpha(...arguments)},this.clear=function(S=!0,V=!0,Y=!0){let $=0;if(S){let W=!1;if(b!==null){const me=b.texture.format;W=m.has(me)}if(W){const me=b.texture.type,ve=p.has(me),ge=be.getClearColor(),we=be.getClearAlpha(),Ce=ge.r,ze=ge.g,$e=ge.b;ve?(y[0]=Ce,y[1]=ze,y[2]=$e,y[3]=we,N.clearBufferuiv(N.COLOR,0,y)):(w[0]=Ce,w[1]=ze,w[2]=$e,w[3]=we,N.clearBufferiv(N.COLOR,0,w))}else $|=N.COLOR_BUFFER_BIT}V&&($|=N.DEPTH_BUFFER_BIT),Y&&($|=N.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),$!==0&&N.clear($)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",Ee,!1),t.removeEventListener("webglcontextrestored",Be,!1),t.removeEventListener("webglcontextcreationerror",mt,!1),be.dispose(),Ne.dispose(),re.dispose(),_.dispose(),Q.dispose(),Se.dispose(),ce.dispose(),ye.dispose(),he.dispose(),Z.dispose(),Z.removeEventListener("sessionstart",Mc),Z.removeEventListener("sessionend",Ec),ki.stop()};function Ee(S){S.preventDefault(),ya("WebGLRenderer: Context Lost."),X=!0}function Be(){ya("WebGLRenderer: Context Restored."),X=!1;const S=T.autoReset,V=Me.enabled,Y=Me.autoUpdate,$=Me.needsUpdate,W=Me.type;oe(),T.autoReset=S,Me.enabled=V,Me.autoUpdate=Y,Me.needsUpdate=$,Me.type=W}function mt(S){Je("WebGLRenderer: A WebGL context could not be created. Reason: ",S.statusMessage)}function rt(S){const V=S.target;V.removeEventListener("dispose",rt),ni(V)}function ni(S){ii(S),_.remove(S)}function ii(S){const V=_.get(S).programs;V!==void 0&&(V.forEach(function(Y){he.releaseProgram(Y)}),S.isShaderMaterial&&he.releaseShaderCache(S))}this.renderBufferDirect=function(S,V,Y,$,W,me){V===null&&(V=ut);const ve=W.isMesh&&W.matrixWorld.determinant()<0,ge=Hu(S,V,Y,$,W);Te.setMaterial($,ve);let we=Y.index,Ce=1;if($.wireframe===!0){if(we=K.getWireframeAttribute(Y),we===void 0)return;Ce=2}const ze=Y.drawRange,$e=Y.attributes.position;let Re=ze.start*Ce,ot=(ze.start+ze.count)*Ce;me!==null&&(Re=Math.max(Re,me.start*Ce),ot=Math.min(ot,(me.start+me.count)*Ce)),we!==null?(Re=Math.max(Re,0),ot=Math.min(ot,we.count)):$e!=null&&(Re=Math.max(Re,0),ot=Math.min(ot,$e.count));const Ct=ot-Re;if(Ct<0||Ct===1/0)return;ce.setup(W,$,ge,Y,we);let bt,lt=Xe;if(we!==null&&(bt=te.get(we),lt=F,lt.setIndex(bt)),W.isMesh)$.wireframe===!0?(Te.setLineWidth($.wireframeLinewidth*At()),lt.setMode(N.LINES)):lt.setMode(N.TRIANGLES);else if(W.isLine){let Kt=$.linewidth;Kt===void 0&&(Kt=1),Te.setLineWidth(Kt*At()),W.isLineSegments?lt.setMode(N.LINES):W.isLineLoop?lt.setMode(N.LINE_LOOP):lt.setMode(N.LINE_STRIP)}else W.isPoints?lt.setMode(N.POINTS):W.isSprite&&lt.setMode(N.TRIANGLES);if(W.isBatchedMesh)if(W._multiDrawInstances!==null)Sa("WebGLRenderer: renderMultiDrawInstances has been deprecated and will be removed in r184. Append to renderMultiDraw arguments and use indirection."),lt.renderMultiDrawInstances(W._multiDrawStarts,W._multiDrawCounts,W._multiDrawCount,W._multiDrawInstances);else if(it.get("WEBGL_multi_draw"))lt.renderMultiDraw(W._multiDrawStarts,W._multiDrawCounts,W._multiDrawCount);else{const Kt=W._multiDrawStarts,Ae=W._multiDrawCounts,pn=W._multiDrawCount,tt=we?te.get(we).bytesPerElement:1,Dn=_.get($).currentProgram.getUniforms();for(let Bn=0;Bn<pn;Bn++)Dn.setValue(N,"_gl_DrawID",Bn),lt.render(Kt[Bn]/tt,Ae[Bn])}else if(W.isInstancedMesh)lt.renderInstances(Re,Ct,W.count);else if(Y.isInstancedBufferGeometry){const Kt=Y._maxInstanceCount!==void 0?Y._maxInstanceCount:1/0,Ae=Math.min(Y.instanceCount,Kt);lt.renderInstances(Re,Ct,Ae)}else lt.render(Re,Ct)};function Sc(S,V,Y){S.transparent===!0&&S.side===Hn&&S.forceSinglePass===!1?(S.side=un,S.needsUpdate=!0,Cr(S,V,Y),S.side=Fi,S.needsUpdate=!0,Cr(S,V,Y),S.side=Hn):Cr(S,V,Y)}this.compile=function(S,V,Y=null){Y===null&&(Y=S),D=re.get(Y),D.init(V),L.push(D),Y.traverseVisible(function(W){W.isLight&&W.layers.test(V.layers)&&(D.pushLight(W),W.castShadow&&D.pushShadow(W))}),S!==Y&&S.traverseVisible(function(W){W.isLight&&W.layers.test(V.layers)&&(D.pushLight(W),W.castShadow&&D.pushShadow(W))}),D.setupLights();const $=new Set;return S.traverse(function(W){if(!(W.isMesh||W.isPoints||W.isLine||W.isSprite))return;const me=W.material;if(me)if(Array.isArray(me))for(let ve=0;ve<me.length;ve++){const ge=me[ve];Sc(ge,Y,W),$.add(ge)}else Sc(me,Y,W),$.add(me)}),D=L.pop(),$},this.compileAsync=function(S,V,Y=null){const $=this.compile(S,V,Y);return new Promise(W=>{function me(){if($.forEach(function(ve){_.get(ve).currentProgram.isReady()&&$.delete(ve)}),$.size===0){W(S);return}setTimeout(me,10)}it.get("KHR_parallel_shader_compile")!==null?me():setTimeout(me,10)})};let za=null;function Gu(S){za&&za(S)}function Mc(){ki.stop()}function Ec(){ki.start()}const ki=new Wf;ki.setAnimationLoop(Gu),typeof self<"u"&&ki.setContext(self),this.setAnimationLoop=function(S){za=S,Z.setAnimationLoop(S),S===null?ki.stop():ki.start()},Z.addEventListener("sessionstart",Mc),Z.addEventListener("sessionend",Ec),this.render=function(S,V){if(V!==void 0&&V.isCamera!==!0){Je("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(X===!0)return;const Y=Z.enabled===!0&&Z.isPresenting===!0,$=x!==null&&(b===null||Y)&&x.begin(E,b);if(S.matrixWorldAutoUpdate===!0&&S.updateMatrixWorld(),V.parent===null&&V.matrixWorldAutoUpdate===!0&&V.updateMatrixWorld(),Z.enabled===!0&&Z.isPresenting===!0&&(x===null||x.isCompositing()===!1)&&(Z.cameraAutoUpdate===!0&&Z.updateCamera(V),V=Z.getCamera()),S.isScene===!0&&S.onBeforeRender(E,S,V,b),D=re.get(S,L.length),D.init(V),L.push(D),kt.multiplyMatrices(V.projectionMatrix,V.matrixWorldInverse),ke.setFromProjectionMatrix(kt,Yn,V.reversedDepth),Oe=this.localClippingEnabled,Ue=le.init(this.clippingPlanes,Oe),M=Ne.get(S,R.length),M.init(),R.push(M),Z.enabled===!0&&Z.isPresenting===!0){const ve=E.xr.getDepthSensingMesh();ve!==null&&ka(ve,V,-1/0,E.sortObjects)}ka(S,V,0,E.sortObjects),M.finish(),E.sortObjects===!0&&M.sort(qe,Ke),We=Z.enabled===!1||Z.isPresenting===!1||Z.hasDepthSensing()===!1,We&&be.addToRenderList(M,S),this.info.render.frame++,Ue===!0&&le.beginShadows();const W=D.state.shadowsArray;if(Me.render(W,S,V),Ue===!0&&le.endShadows(),this.info.autoReset===!0&&this.info.reset(),($&&x.hasRenderPass())===!1){const ve=M.opaque,ge=M.transmissive;if(D.setupLights(),V.isArrayCamera){const we=V.cameras;if(ge.length>0)for(let Ce=0,ze=we.length;Ce<ze;Ce++){const $e=we[Ce];wc(ve,ge,S,$e)}We&&be.render(S);for(let Ce=0,ze=we.length;Ce<ze;Ce++){const $e=we[Ce];bc(M,S,$e,$e.viewport)}}else ge.length>0&&wc(ve,ge,S,V),We&&be.render(S),bc(M,S,V)}b!==null&&G===0&&(B.updateMultisampleRenderTarget(b),B.updateRenderTargetMipmap(b)),$&&x.end(E),S.isScene===!0&&S.onAfterRender(E,S,V),ce.resetDefaultState(),U=-1,C=null,L.pop(),L.length>0?(D=L[L.length-1],Ue===!0&&le.setGlobalState(E.clippingPlanes,D.state.camera)):D=null,R.pop(),R.length>0?M=R[R.length-1]:M=null};function ka(S,V,Y,$){if(S.visible===!1)return;if(S.layers.test(V.layers)){if(S.isGroup)Y=S.renderOrder;else if(S.isLOD)S.autoUpdate===!0&&S.update(V);else if(S.isLight)D.pushLight(S),S.castShadow&&D.pushShadow(S);else if(S.isSprite){if(!S.frustumCulled||ke.intersectsSprite(S)){$&&st.setFromMatrixPosition(S.matrixWorld).applyMatrix4(kt);const ve=Se.update(S),ge=S.material;ge.visible&&M.push(S,ve,ge,Y,st.z,null)}}else if((S.isMesh||S.isLine||S.isPoints)&&(!S.frustumCulled||ke.intersectsObject(S))){const ve=Se.update(S),ge=S.material;if($&&(S.boundingSphere!==void 0?(S.boundingSphere===null&&S.computeBoundingSphere(),st.copy(S.boundingSphere.center)):(ve.boundingSphere===null&&ve.computeBoundingSphere(),st.copy(ve.boundingSphere.center)),st.applyMatrix4(S.matrixWorld).applyMatrix4(kt)),Array.isArray(ge)){const we=ve.groups;for(let Ce=0,ze=we.length;Ce<ze;Ce++){const $e=we[Ce],Re=ge[$e.materialIndex];Re&&Re.visible&&M.push(S,ve,Re,Y,st.z,$e)}}else ge.visible&&M.push(S,ve,ge,Y,st.z,null)}}const me=S.children;for(let ve=0,ge=me.length;ve<ge;ve++)ka(me[ve],V,Y,$)}function bc(S,V,Y,$){const{opaque:W,transmissive:me,transparent:ve}=S;D.setupLightsView(Y),Ue===!0&&le.setGlobalState(E.clippingPlanes,Y),$&&Te.viewport(P.copy($)),W.length>0&&Ar(W,V,Y),me.length>0&&Ar(me,V,Y),ve.length>0&&Ar(ve,V,Y),Te.buffers.depth.setTest(!0),Te.buffers.depth.setMask(!0),Te.buffers.color.setMask(!0),Te.setPolygonOffset(!1)}function wc(S,V,Y,$){if((Y.isScene===!0?Y.overrideMaterial:null)!==null)return;if(D.state.transmissionRenderTarget[$.id]===void 0){const Re=it.has("EXT_color_buffer_half_float")||it.has("EXT_color_buffer_float");D.state.transmissionRenderTarget[$.id]=new jn(1,1,{generateMipmaps:!0,type:Re?_i:yn,minFilter:Qi,samples:Math.max(4,pt.samples),stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:et.workingColorSpace})}const me=D.state.transmissionRenderTarget[$.id],ve=$.viewport||P;me.setSize(ve.z*E.transmissionResolutionScale,ve.w*E.transmissionResolutionScale);const ge=E.getRenderTarget(),we=E.getActiveCubeFace(),Ce=E.getActiveMipmapLevel();E.setRenderTarget(me),E.getClearColor(j),ee=E.getClearAlpha(),ee<1&&E.setClearColor(16777215,.5),E.clear(),We&&be.render(Y);const ze=E.toneMapping;E.toneMapping=qn;const $e=$.viewport;if($.viewport!==void 0&&($.viewport=void 0),D.setupLightsView($),Ue===!0&&le.setGlobalState(E.clippingPlanes,$),Ar(S,Y,$),B.updateMultisampleRenderTarget(me),B.updateRenderTargetMipmap(me),it.has("WEBGL_multisampled_render_to_texture")===!1){let Re=!1;for(let ot=0,Ct=V.length;ot<Ct;ot++){const bt=V[ot],{object:lt,geometry:Kt,material:Ae,group:pn}=bt;if(Ae.side===Hn&&lt.layers.test($.layers)){const tt=Ae.side;Ae.side=un,Ae.needsUpdate=!0,Tc(lt,Y,$,Kt,Ae,pn),Ae.side=tt,Ae.needsUpdate=!0,Re=!0}}Re===!0&&(B.updateMultisampleRenderTarget(me),B.updateRenderTargetMipmap(me))}E.setRenderTarget(ge,we,Ce),E.setClearColor(j,ee),$e!==void 0&&($.viewport=$e),E.toneMapping=ze}function Ar(S,V,Y){const $=V.isScene===!0?V.overrideMaterial:null;for(let W=0,me=S.length;W<me;W++){const ve=S[W],{object:ge,geometry:we,group:Ce}=ve;let ze=ve.material;ze.allowOverride===!0&&$!==null&&(ze=$),ge.layers.test(Y.layers)&&Tc(ge,V,Y,we,ze,Ce)}}function Tc(S,V,Y,$,W,me){S.onBeforeRender(E,V,Y,$,W,me),S.modelViewMatrix.multiplyMatrices(Y.matrixWorldInverse,S.matrixWorld),S.normalMatrix.getNormalMatrix(S.modelViewMatrix),W.onBeforeRender(E,V,Y,$,S,me),W.transparent===!0&&W.side===Hn&&W.forceSinglePass===!1?(W.side=un,W.needsUpdate=!0,E.renderBufferDirect(Y,V,$,W,S,me),W.side=Fi,W.needsUpdate=!0,E.renderBufferDirect(Y,V,$,W,S,me),W.side=Hn):E.renderBufferDirect(Y,V,$,W,S,me),S.onAfterRender(E,V,Y,$,W,me)}function Cr(S,V,Y){V.isScene!==!0&&(V=ut);const $=_.get(S),W=D.state.lights,me=D.state.shadowsArray,ve=W.state.version,ge=he.getParameters(S,W.state,me,V,Y),we=he.getProgramCacheKey(ge);let Ce=$.programs;$.environment=S.isMeshStandardMaterial||S.isMeshLambertMaterial||S.isMeshPhongMaterial?V.environment:null,$.fog=V.fog;const ze=S.isMeshStandardMaterial||S.isMeshLambertMaterial&&!S.envMap||S.isMeshPhongMaterial&&!S.envMap;$.envMap=Q.get(S.envMap||$.environment,ze),$.envMapRotation=$.environment!==null&&S.envMap===null?V.environmentRotation:S.envMapRotation,Ce===void 0&&(S.addEventListener("dispose",rt),Ce=new Map,$.programs=Ce);let $e=Ce.get(we);if($e!==void 0){if($.currentProgram===$e&&$.lightsStateVersion===ve)return Cc(S,ge),$e}else ge.uniforms=he.getUniforms(S),S.onBeforeCompile(ge,E),$e=he.acquireProgram(ge,we),Ce.set(we,$e),$.uniforms=ge.uniforms;const Re=$.uniforms;return(!S.isShaderMaterial&&!S.isRawShaderMaterial||S.clipping===!0)&&(Re.clippingPlanes=le.uniform),Cc(S,ge),$.needsLights=Xu(S),$.lightsStateVersion=ve,$.needsLights&&(Re.ambientLightColor.value=W.state.ambient,Re.lightProbe.value=W.state.probe,Re.directionalLights.value=W.state.directional,Re.directionalLightShadows.value=W.state.directionalShadow,Re.spotLights.value=W.state.spot,Re.spotLightShadows.value=W.state.spotShadow,Re.rectAreaLights.value=W.state.rectArea,Re.ltc_1.value=W.state.rectAreaLTC1,Re.ltc_2.value=W.state.rectAreaLTC2,Re.pointLights.value=W.state.point,Re.pointLightShadows.value=W.state.pointShadow,Re.hemisphereLights.value=W.state.hemi,Re.directionalShadowMatrix.value=W.state.directionalShadowMatrix,Re.spotLightMatrix.value=W.state.spotLightMatrix,Re.spotLightMap.value=W.state.spotLightMap,Re.pointShadowMatrix.value=W.state.pointShadowMatrix),$.currentProgram=$e,$.uniformsList=null,$e}function Ac(S){if(S.uniformsList===null){const V=S.currentProgram.getUniforms();S.uniformsList=pa.seqWithValue(V.seq,S.uniforms)}return S.uniformsList}function Cc(S,V){const Y=_.get(S);Y.outputColorSpace=V.outputColorSpace,Y.batching=V.batching,Y.batchingColor=V.batchingColor,Y.instancing=V.instancing,Y.instancingColor=V.instancingColor,Y.instancingMorph=V.instancingMorph,Y.skinning=V.skinning,Y.morphTargets=V.morphTargets,Y.morphNormals=V.morphNormals,Y.morphColors=V.morphColors,Y.morphTargetsCount=V.morphTargetsCount,Y.numClippingPlanes=V.numClippingPlanes,Y.numIntersection=V.numClipIntersection,Y.vertexAlphas=V.vertexAlphas,Y.vertexTangents=V.vertexTangents,Y.toneMapping=V.toneMapping}function Hu(S,V,Y,$,W){V.isScene!==!0&&(V=ut),B.resetTextureUnits();const me=V.fog,ve=$.isMeshStandardMaterial||$.isMeshLambertMaterial||$.isMeshPhongMaterial?V.environment:null,ge=b===null?E.outputColorSpace:b.isXRRenderTarget===!0?b.texture.colorSpace:Vs,we=$.isMeshStandardMaterial||$.isMeshLambertMaterial&&!$.envMap||$.isMeshPhongMaterial&&!$.envMap,Ce=Q.get($.envMap||ve,we),ze=$.vertexColors===!0&&!!Y.attributes.color&&Y.attributes.color.itemSize===4,$e=!!Y.attributes.tangent&&(!!$.normalMap||$.anisotropy>0),Re=!!Y.morphAttributes.position,ot=!!Y.morphAttributes.normal,Ct=!!Y.morphAttributes.color;let bt=qn;$.toneMapped&&(b===null||b.isXRRenderTarget===!0)&&(bt=E.toneMapping);const lt=Y.morphAttributes.position||Y.morphAttributes.normal||Y.morphAttributes.color,Kt=lt!==void 0?lt.length:0,Ae=_.get($),pn=D.state.lights;if(Ue===!0&&(Oe===!0||S!==C)){const Vt=S===C&&$.id===U;le.setState($,S,Vt)}let tt=!1;$.version===Ae.__version?(Ae.needsLights&&Ae.lightsStateVersion!==pn.state.version||Ae.outputColorSpace!==ge||W.isBatchedMesh&&Ae.batching===!1||!W.isBatchedMesh&&Ae.batching===!0||W.isBatchedMesh&&Ae.batchingColor===!0&&W.colorTexture===null||W.isBatchedMesh&&Ae.batchingColor===!1&&W.colorTexture!==null||W.isInstancedMesh&&Ae.instancing===!1||!W.isInstancedMesh&&Ae.instancing===!0||W.isSkinnedMesh&&Ae.skinning===!1||!W.isSkinnedMesh&&Ae.skinning===!0||W.isInstancedMesh&&Ae.instancingColor===!0&&W.instanceColor===null||W.isInstancedMesh&&Ae.instancingColor===!1&&W.instanceColor!==null||W.isInstancedMesh&&Ae.instancingMorph===!0&&W.morphTexture===null||W.isInstancedMesh&&Ae.instancingMorph===!1&&W.morphTexture!==null||Ae.envMap!==Ce||$.fog===!0&&Ae.fog!==me||Ae.numClippingPlanes!==void 0&&(Ae.numClippingPlanes!==le.numPlanes||Ae.numIntersection!==le.numIntersection)||Ae.vertexAlphas!==ze||Ae.vertexTangents!==$e||Ae.morphTargets!==Re||Ae.morphNormals!==ot||Ae.morphColors!==Ct||Ae.toneMapping!==bt||Ae.morphTargetsCount!==Kt)&&(tt=!0):(tt=!0,Ae.__version=$.version);let Dn=Ae.currentProgram;tt===!0&&(Dn=Cr($,V,W));let Bn=!1,Vi=!1,ls=!1;const dt=Dn.getUniforms(),qt=Ae.uniforms;if(Te.useProgram(Dn.program)&&(Bn=!0,Vi=!0,ls=!0),$.id!==U&&(U=$.id,Vi=!0),Bn||C!==S){Te.buffers.depth.getReversed()&&S.reversedDepth!==!0&&(S._reversedDepth=!0,S.updateProjectionMatrix()),dt.setValue(N,"projectionMatrix",S.projectionMatrix),dt.setValue(N,"viewMatrix",S.matrixWorldInverse);const Mi=dt.map.cameraPosition;Mi!==void 0&&Mi.setValue(N,Qe.setFromMatrixPosition(S.matrixWorld)),pt.logarithmicDepthBuffer&&dt.setValue(N,"logDepthBufFC",2/(Math.log(S.far+1)/Math.LN2)),($.isMeshPhongMaterial||$.isMeshToonMaterial||$.isMeshLambertMaterial||$.isMeshBasicMaterial||$.isMeshStandardMaterial||$.isShaderMaterial)&&dt.setValue(N,"isOrthographic",S.isOrthographicCamera===!0),C!==S&&(C=S,Vi=!0,ls=!0)}if(Ae.needsLights&&(pn.state.directionalShadowMap.length>0&&dt.setValue(N,"directionalShadowMap",pn.state.directionalShadowMap,B),pn.state.spotShadowMap.length>0&&dt.setValue(N,"spotShadowMap",pn.state.spotShadowMap,B),pn.state.pointShadowMap.length>0&&dt.setValue(N,"pointShadowMap",pn.state.pointShadowMap,B)),W.isSkinnedMesh){dt.setOptional(N,W,"bindMatrix"),dt.setOptional(N,W,"bindMatrixInverse");const Vt=W.skeleton;Vt&&(Vt.boneTexture===null&&Vt.computeBoneTexture(),dt.setValue(N,"boneTexture",Vt.boneTexture,B))}W.isBatchedMesh&&(dt.setOptional(N,W,"batchingTexture"),dt.setValue(N,"batchingTexture",W._matricesTexture,B),dt.setOptional(N,W,"batchingIdTexture"),dt.setValue(N,"batchingIdTexture",W._indirectTexture,B),dt.setOptional(N,W,"batchingColorTexture"),W._colorsTexture!==null&&dt.setValue(N,"batchingColorTexture",W._colorsTexture,B));const Si=Y.morphAttributes;if((Si.position!==void 0||Si.normal!==void 0||Si.color!==void 0)&&xe.update(W,Y,Dn),(Vi||Ae.receiveShadow!==W.receiveShadow)&&(Ae.receiveShadow=W.receiveShadow,dt.setValue(N,"receiveShadow",W.receiveShadow)),($.isMeshStandardMaterial||$.isMeshLambertMaterial||$.isMeshPhongMaterial)&&$.envMap===null&&V.environment!==null&&(qt.envMapIntensity.value=V.environmentIntensity),qt.dfgLUT!==void 0&&(qt.dfgLUT.value=hx()),Vi&&(dt.setValue(N,"toneMappingExposure",E.toneMappingExposure),Ae.needsLights&&Wu(qt,ls),me&&$.fog===!0&&De.refreshFogUniforms(qt,me),De.refreshMaterialUniforms(qt,$,Pe,ie,D.state.transmissionRenderTarget[S.id]),pa.upload(N,Ac(Ae),qt,B)),$.isShaderMaterial&&$.uniformsNeedUpdate===!0&&(pa.upload(N,Ac(Ae),qt,B),$.uniformsNeedUpdate=!1),$.isSpriteMaterial&&dt.setValue(N,"center",W.center),dt.setValue(N,"modelViewMatrix",W.modelViewMatrix),dt.setValue(N,"normalMatrix",W.normalMatrix),dt.setValue(N,"modelMatrix",W.matrixWorld),$.isShaderMaterial||$.isRawShaderMaterial){const Vt=$.uniformsGroups;for(let Mi=0,cs=Vt.length;Mi<cs;Mi++){const Rc=Vt[Mi];ye.update(Rc,Dn),ye.bind(Rc,Dn)}}return Dn}function Wu(S,V){S.ambientLightColor.needsUpdate=V,S.lightProbe.needsUpdate=V,S.directionalLights.needsUpdate=V,S.directionalLightShadows.needsUpdate=V,S.pointLights.needsUpdate=V,S.pointLightShadows.needsUpdate=V,S.spotLights.needsUpdate=V,S.spotLightShadows.needsUpdate=V,S.rectAreaLights.needsUpdate=V,S.hemisphereLights.needsUpdate=V}function Xu(S){return S.isMeshLambertMaterial||S.isMeshToonMaterial||S.isMeshPhongMaterial||S.isMeshStandardMaterial||S.isShadowMaterial||S.isShaderMaterial&&S.lights===!0}this.getActiveCubeFace=function(){return I},this.getActiveMipmapLevel=function(){return G},this.getRenderTarget=function(){return b},this.setRenderTargetTextures=function(S,V,Y){const $=_.get(S);$.__autoAllocateDepthBuffer=S.resolveDepthBuffer===!1,$.__autoAllocateDepthBuffer===!1&&($.__useRenderToTexture=!1),_.get(S.texture).__webglTexture=V,_.get(S.depthTexture).__webglTexture=$.__autoAllocateDepthBuffer?void 0:Y,$.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(S,V){const Y=_.get(S);Y.__webglFramebuffer=V,Y.__useDefaultFramebuffer=V===void 0};const $u=N.createFramebuffer();this.setRenderTarget=function(S,V=0,Y=0){b=S,I=V,G=Y;let $=null,W=!1,me=!1;if(S){const ge=_.get(S);if(ge.__useDefaultFramebuffer!==void 0){Te.bindFramebuffer(N.FRAMEBUFFER,ge.__webglFramebuffer),P.copy(S.viewport),A.copy(S.scissor),q=S.scissorTest,Te.viewport(P),Te.scissor(A),Te.setScissorTest(q),U=-1;return}else if(ge.__webglFramebuffer===void 0)B.setupRenderTarget(S);else if(ge.__hasExternalTextures)B.rebindTextures(S,_.get(S.texture).__webglTexture,_.get(S.depthTexture).__webglTexture);else if(S.depthBuffer){const ze=S.depthTexture;if(ge.__boundDepthTexture!==ze){if(ze!==null&&_.has(ze)&&(S.width!==ze.image.width||S.height!==ze.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");B.setupDepthRenderbuffer(S)}}const we=S.texture;(we.isData3DTexture||we.isDataArrayTexture||we.isCompressedArrayTexture)&&(me=!0);const Ce=_.get(S).__webglFramebuffer;S.isWebGLCubeRenderTarget?(Array.isArray(Ce[V])?$=Ce[V][Y]:$=Ce[V],W=!0):S.samples>0&&B.useMultisampledRTT(S)===!1?$=_.get(S).__webglMultisampledFramebuffer:Array.isArray(Ce)?$=Ce[Y]:$=Ce,P.copy(S.viewport),A.copy(S.scissor),q=S.scissorTest}else P.copy(J).multiplyScalar(Pe).floor(),A.copy(ae).multiplyScalar(Pe).floor(),q=ue;if(Y!==0&&($=$u),Te.bindFramebuffer(N.FRAMEBUFFER,$)&&Te.drawBuffers(S,$),Te.viewport(P),Te.scissor(A),Te.setScissorTest(q),W){const ge=_.get(S.texture);N.framebufferTexture2D(N.FRAMEBUFFER,N.COLOR_ATTACHMENT0,N.TEXTURE_CUBE_MAP_POSITIVE_X+V,ge.__webglTexture,Y)}else if(me){const ge=V;for(let we=0;we<S.textures.length;we++){const Ce=_.get(S.textures[we]);N.framebufferTextureLayer(N.FRAMEBUFFER,N.COLOR_ATTACHMENT0+we,Ce.__webglTexture,Y,ge)}}else if(S!==null&&Y!==0){const ge=_.get(S.texture);N.framebufferTexture2D(N.FRAMEBUFFER,N.COLOR_ATTACHMENT0,N.TEXTURE_2D,ge.__webglTexture,Y)}U=-1},this.readRenderTargetPixels=function(S,V,Y,$,W,me,ve,ge=0){if(!(S&&S.isWebGLRenderTarget)){Je("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let we=_.get(S).__webglFramebuffer;if(S.isWebGLCubeRenderTarget&&ve!==void 0&&(we=we[ve]),we){Te.bindFramebuffer(N.FRAMEBUFFER,we);try{const Ce=S.textures[ge],ze=Ce.format,$e=Ce.type;if(S.textures.length>1&&N.readBuffer(N.COLOR_ATTACHMENT0+ge),!pt.textureFormatReadable(ze)){Je("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!pt.textureTypeReadable($e)){Je("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}V>=0&&V<=S.width-$&&Y>=0&&Y<=S.height-W&&N.readPixels(V,Y,$,W,fe.convert(ze),fe.convert($e),me)}finally{const Ce=b!==null?_.get(b).__webglFramebuffer:null;Te.bindFramebuffer(N.FRAMEBUFFER,Ce)}}},this.readRenderTargetPixelsAsync=async function(S,V,Y,$,W,me,ve,ge=0){if(!(S&&S.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let we=_.get(S).__webglFramebuffer;if(S.isWebGLCubeRenderTarget&&ve!==void 0&&(we=we[ve]),we)if(V>=0&&V<=S.width-$&&Y>=0&&Y<=S.height-W){Te.bindFramebuffer(N.FRAMEBUFFER,we);const Ce=S.textures[ge],ze=Ce.format,$e=Ce.type;if(S.textures.length>1&&N.readBuffer(N.COLOR_ATTACHMENT0+ge),!pt.textureFormatReadable(ze))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!pt.textureTypeReadable($e))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const Re=N.createBuffer();N.bindBuffer(N.PIXEL_PACK_BUFFER,Re),N.bufferData(N.PIXEL_PACK_BUFFER,me.byteLength,N.STREAM_READ),N.readPixels(V,Y,$,W,fe.convert(ze),fe.convert($e),0);const ot=b!==null?_.get(b).__webglFramebuffer:null;Te.bindFramebuffer(N.FRAMEBUFFER,ot);const Ct=N.fenceSync(N.SYNC_GPU_COMMANDS_COMPLETE,0);return N.flush(),await Cd(N,Ct,4),N.bindBuffer(N.PIXEL_PACK_BUFFER,Re),N.getBufferSubData(N.PIXEL_PACK_BUFFER,0,me),N.deleteBuffer(Re),N.deleteSync(Ct),me}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(S,V=null,Y=0){const $=Math.pow(2,-Y),W=Math.floor(S.image.width*$),me=Math.floor(S.image.height*$),ve=V!==null?V.x:0,ge=V!==null?V.y:0;B.setTexture2D(S,0),N.copyTexSubImage2D(N.TEXTURE_2D,Y,0,0,ve,ge,W,me),Te.unbindTexture()};const Yu=N.createFramebuffer(),qu=N.createFramebuffer();this.copyTextureToTexture=function(S,V,Y=null,$=null,W=0,me=0){let ve,ge,we,Ce,ze,$e,Re,ot,Ct;const bt=S.isCompressedTexture?S.mipmaps[me]:S.image;if(Y!==null)ve=Y.max.x-Y.min.x,ge=Y.max.y-Y.min.y,we=Y.isBox3?Y.max.z-Y.min.z:1,Ce=Y.min.x,ze=Y.min.y,$e=Y.isBox3?Y.min.z:0;else{const qt=Math.pow(2,-W);ve=Math.floor(bt.width*qt),ge=Math.floor(bt.height*qt),S.isDataArrayTexture?we=bt.depth:S.isData3DTexture?we=Math.floor(bt.depth*qt):we=1,Ce=0,ze=0,$e=0}$!==null?(Re=$.x,ot=$.y,Ct=$.z):(Re=0,ot=0,Ct=0);const lt=fe.convert(V.format),Kt=fe.convert(V.type);let Ae;V.isData3DTexture?(B.setTexture3D(V,0),Ae=N.TEXTURE_3D):V.isDataArrayTexture||V.isCompressedArrayTexture?(B.setTexture2DArray(V,0),Ae=N.TEXTURE_2D_ARRAY):(B.setTexture2D(V,0),Ae=N.TEXTURE_2D),N.pixelStorei(N.UNPACK_FLIP_Y_WEBGL,V.flipY),N.pixelStorei(N.UNPACK_PREMULTIPLY_ALPHA_WEBGL,V.premultiplyAlpha),N.pixelStorei(N.UNPACK_ALIGNMENT,V.unpackAlignment);const pn=N.getParameter(N.UNPACK_ROW_LENGTH),tt=N.getParameter(N.UNPACK_IMAGE_HEIGHT),Dn=N.getParameter(N.UNPACK_SKIP_PIXELS),Bn=N.getParameter(N.UNPACK_SKIP_ROWS),Vi=N.getParameter(N.UNPACK_SKIP_IMAGES);N.pixelStorei(N.UNPACK_ROW_LENGTH,bt.width),N.pixelStorei(N.UNPACK_IMAGE_HEIGHT,bt.height),N.pixelStorei(N.UNPACK_SKIP_PIXELS,Ce),N.pixelStorei(N.UNPACK_SKIP_ROWS,ze),N.pixelStorei(N.UNPACK_SKIP_IMAGES,$e);const ls=S.isDataArrayTexture||S.isData3DTexture,dt=V.isDataArrayTexture||V.isData3DTexture;if(S.isDepthTexture){const qt=_.get(S),Si=_.get(V),Vt=_.get(qt.__renderTarget),Mi=_.get(Si.__renderTarget);Te.bindFramebuffer(N.READ_FRAMEBUFFER,Vt.__webglFramebuffer),Te.bindFramebuffer(N.DRAW_FRAMEBUFFER,Mi.__webglFramebuffer);for(let cs=0;cs<we;cs++)ls&&(N.framebufferTextureLayer(N.READ_FRAMEBUFFER,N.COLOR_ATTACHMENT0,_.get(S).__webglTexture,W,$e+cs),N.framebufferTextureLayer(N.DRAW_FRAMEBUFFER,N.COLOR_ATTACHMENT0,_.get(V).__webglTexture,me,Ct+cs)),N.blitFramebuffer(Ce,ze,ve,ge,Re,ot,ve,ge,N.DEPTH_BUFFER_BIT,N.NEAREST);Te.bindFramebuffer(N.READ_FRAMEBUFFER,null),Te.bindFramebuffer(N.DRAW_FRAMEBUFFER,null)}else if(W!==0||S.isRenderTargetTexture||_.has(S)){const qt=_.get(S),Si=_.get(V);Te.bindFramebuffer(N.READ_FRAMEBUFFER,Yu),Te.bindFramebuffer(N.DRAW_FRAMEBUFFER,qu);for(let Vt=0;Vt<we;Vt++)ls?N.framebufferTextureLayer(N.READ_FRAMEBUFFER,N.COLOR_ATTACHMENT0,qt.__webglTexture,W,$e+Vt):N.framebufferTexture2D(N.READ_FRAMEBUFFER,N.COLOR_ATTACHMENT0,N.TEXTURE_2D,qt.__webglTexture,W),dt?N.framebufferTextureLayer(N.DRAW_FRAMEBUFFER,N.COLOR_ATTACHMENT0,Si.__webglTexture,me,Ct+Vt):N.framebufferTexture2D(N.DRAW_FRAMEBUFFER,N.COLOR_ATTACHMENT0,N.TEXTURE_2D,Si.__webglTexture,me),W!==0?N.blitFramebuffer(Ce,ze,ve,ge,Re,ot,ve,ge,N.COLOR_BUFFER_BIT,N.NEAREST):dt?N.copyTexSubImage3D(Ae,me,Re,ot,Ct+Vt,Ce,ze,ve,ge):N.copyTexSubImage2D(Ae,me,Re,ot,Ce,ze,ve,ge);Te.bindFramebuffer(N.READ_FRAMEBUFFER,null),Te.bindFramebuffer(N.DRAW_FRAMEBUFFER,null)}else dt?S.isDataTexture||S.isData3DTexture?N.texSubImage3D(Ae,me,Re,ot,Ct,ve,ge,we,lt,Kt,bt.data):V.isCompressedArrayTexture?N.compressedTexSubImage3D(Ae,me,Re,ot,Ct,ve,ge,we,lt,bt.data):N.texSubImage3D(Ae,me,Re,ot,Ct,ve,ge,we,lt,Kt,bt):S.isDataTexture?N.texSubImage2D(N.TEXTURE_2D,me,Re,ot,ve,ge,lt,Kt,bt.data):S.isCompressedTexture?N.compressedTexSubImage2D(N.TEXTURE_2D,me,Re,ot,bt.width,bt.height,lt,bt.data):N.texSubImage2D(N.TEXTURE_2D,me,Re,ot,ve,ge,lt,Kt,bt);N.pixelStorei(N.UNPACK_ROW_LENGTH,pn),N.pixelStorei(N.UNPACK_IMAGE_HEIGHT,tt),N.pixelStorei(N.UNPACK_SKIP_PIXELS,Dn),N.pixelStorei(N.UNPACK_SKIP_ROWS,Bn),N.pixelStorei(N.UNPACK_SKIP_IMAGES,Vi),me===0&&V.generateMipmaps&&N.generateMipmap(Ae),Te.unbindTexture()},this.initRenderTarget=function(S){_.get(S).__webglFramebuffer===void 0&&B.setupRenderTarget(S)},this.initTexture=function(S){S.isCubeTexture?B.setTextureCube(S,0):S.isData3DTexture?B.setTexture3D(S,0):S.isDataArrayTexture||S.isCompressedArrayTexture?B.setTexture2DArray(S,0):B.setTexture2D(S,0),Te.unbindTexture()},this.resetState=function(){I=0,G=0,b=null,Te.reset(),ce.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Yn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorSpace=et._getDrawingBufferColorSpace(e),t.unpackColorSpace=et._getUnpackColorSpace()}}ArrayBuffer.isView||(ArrayBuffer.isView=i=>i!==null&&typeof i=="object"&&i.buffer instanceof ArrayBuffer);typeof globalThis>"u"&&typeof window<"u"&&(window.globalThis=window);typeof FormData>"u"&&(globalThis.FormData=class{});var en={JOIN_ROOM:10,ERROR:11,LEAVE_ROOM:12,ROOM_DATA:13,ROOM_STATE:14,ROOM_STATE_PATCH:15,ROOM_DATA_BYTES:17,PING:18},Vn={GOING_AWAY:1001,NO_STATUS_RECEIVED:1005,ABNORMAL_CLOSURE:1006,CONSENTED:4e3,FAILED_TO_RECONNECT:4003,MAY_TRY_RECONNECT:4010};class hr extends Error{code;headers;status;response;data;constructor(e,t,n){super(t),this.name="ServerError",this.code=e,n&&(this.headers=n.headers,this.status=n.status,this.response=n.response,this.data=n.data)}}class ec extends Error{code;constructor(e,t){super(e),this.code=t,this.name="MatchMakeError",Object.setPrototypeOf(this,ec.prototype)}}const Ta=255,Kf=213;var _e;(function(i){i[i.ADD=128]="ADD",i[i.REPLACE=0]="REPLACE",i[i.DELETE=64]="DELETE",i[i.DELETE_AND_MOVE=96]="DELETE_AND_MOVE",i[i.MOVE_AND_ADD=160]="MOVE_AND_ADD",i[i.DELETE_AND_ADD=192]="DELETE_AND_ADD",i[i.CLEAR=10]="CLEAR",i[i.REVERSE=15]="REVERSE",i[i.MOVE=32]="MOVE",i[i.DELETE_BY_REFID=33]="DELETE_BY_REFID",i[i.ADD_BY_REFID=129]="ADD_BY_REFID"})(_e||(_e={}));Symbol.metadata??=Symbol.for("Symbol.metadata");const nt="~refId",Os="~track",Zn="~encoder",Kn="~decoder",js="~filter",Pn="~getByIndex",os="~deleteByIndex",ne="~changes",ft="~childType",Hs="~onEncodeEnd",bl="~onDecodeEnd",Ri="~descriptors",bn="~__numFields",Zi="~__refTypeFieldIndexes",hi="~__viewFieldIndexes",Cs="$__fieldIndexesByViewTag";let fx;try{fx=new TextEncoder}catch{}const Ia=new ArrayBuffer(8),ns=new Int32Array(Ia),wl=new Float32Array(Ia),ux=new Float64Array(Ia),Jf=new BigInt64Array(Ia),dx=typeof Buffer<"u"&&Buffer.byteLength,Qf=dx?Buffer.byteLength:function(i,e){for(var t=0,n=0,s=0,r=i.length;s<r;s++)t=i.charCodeAt(s),t<128?n+=1:t<2048?n+=2:t<55296||t>=57344?n+=3:(s++,n+=4);return n};function eu(i,e,t){for(var n=0,s=0,r=e.length;s<r;s++)n=e.charCodeAt(s),n<128?i[t.offset++]=n:n<2048?(i[t.offset]=192|n>>6,i[t.offset+1]=128|n&63,t.offset+=2):n<55296||n>=57344?(i[t.offset]=224|n>>12,i[t.offset+1]=128|n>>6&63,i[t.offset+2]=128|n&63,t.offset+=3):(s++,n=65536+((n&1023)<<10|e.charCodeAt(s)&1023),i[t.offset]=240|n>>18,i[t.offset+1]=128|n>>12&63,i[t.offset+2]=128|n>>6&63,i[t.offset+3]=128|n&63,t.offset+=4)}function tu(i,e,t){i[t.offset++]=e&255}function px(i,e,t){i[t.offset++]=e&255}function nu(i,e,t){i[t.offset++]=e&255,i[t.offset++]=e>>8&255}function tc(i,e,t){i[t.offset++]=e&255,i[t.offset++]=e>>8&255}function vi(i,e,t){i[t.offset++]=e&255,i[t.offset++]=e>>8&255,i[t.offset++]=e>>16&255,i[t.offset++]=e>>24&255}function is(i,e,t){const n=e>>24,s=e>>16,r=e>>8,a=e;i[t.offset++]=a&255,i[t.offset++]=r&255,i[t.offset++]=s&255,i[t.offset++]=n&255}function iu(i,e,t){const n=Math.floor(e/Math.pow(2,32)),s=e>>>0;is(i,s,t),is(i,n,t)}function su(i,e,t){const n=e/Math.pow(2,32)>>0,s=e>>>0;is(i,s,t),is(i,n,t)}function mx(i,e,t){Jf[0]=BigInt.asIntN(64,e),vi(i,ns[0],t),vi(i,ns[1],t)}function gx(i,e,t){Jf[0]=BigInt.asIntN(64,e),vi(i,ns[0],t),vi(i,ns[1],t)}function ru(i,e,t){wl[0]=e,vi(i,ns[0],t)}function au(i,e,t){ux[0]=e,vi(i,ns[0],t),vi(i,ns[1],t)}function _x(i,e,t){i[t.offset++]=e?1:0}function xx(i,e,t){e||(e="");let n=Qf(e,"utf8"),s=0;if(n<32)i[t.offset++]=n|160,s=1;else if(n<256)i[t.offset++]=217,i[t.offset++]=n,s=2;else if(n<65536)i[t.offset++]=218,tc(i,n,t),s=3;else if(n<4294967296)i[t.offset++]=219,is(i,n,t),s=5;else throw new Error("String too long");return eu(i,e,t),s+n}function Tl(i,e,t){if(isNaN(e))return Tl(i,0,t);if(isFinite(e)){if(e!==(e|0))return Math.abs(e)<=34028235e31&&(wl[0]=e,Math.abs(Math.abs(wl[0])-Math.abs(e))<1e-4)?(i[t.offset++]=202,ru(i,e,t),5):(i[t.offset++]=203,au(i,e,t),9)}else return Tl(i,e>0?Number.MAX_SAFE_INTEGER:-Number.MAX_SAFE_INTEGER,t);return e>=0?e<128?(i[t.offset++]=e&255,1):e<256?(i[t.offset++]=204,i[t.offset++]=e&255,2):e<65536?(i[t.offset++]=205,tc(i,e,t),3):e<4294967296?(i[t.offset++]=206,is(i,e,t),5):(i[t.offset++]=207,su(i,e,t),9):e>=-32?(i[t.offset++]=224|e+32,1):e>=-128?(i[t.offset++]=208,tu(i,e,t),2):e>=-32768?(i[t.offset++]=209,nu(i,e,t),3):e>=-2147483648?(i[t.offset++]=210,vi(i,e,t),5):(i[t.offset++]=211,iu(i,e,t),9)}const wt={int8:tu,uint8:px,int16:nu,uint16:tc,int32:vi,uint32:is,int64:iu,uint64:su,bigint64:mx,biguint64:gx,float32:ru,float64:au,boolean:_x,string:xx,number:Tl,utf8Write:eu,utf8Length:Qf},Mr=new ArrayBuffer(8),ss=new Int32Array(Mr),vx=new Float32Array(Mr),yx=new Float64Array(Mr),Sx=new BigUint64Array(Mr),Mx=new BigInt64Array(Mr);function ou(i,e,t){t>i.length-e.offset&&(t=i.length-e.offset);for(var n="",s=0,r=e.offset,a=e.offset+t;r<a;r++){var o=i[r];if((o&128)===0){n+=String.fromCharCode(o);continue}if((o&224)===192){n+=String.fromCharCode((o&31)<<6|i[++r]&63);continue}if((o&240)===224){n+=String.fromCharCode((o&15)<<12|(i[++r]&63)<<6|(i[++r]&63)<<0);continue}if((o&248)===240){s=(o&7)<<18|(i[++r]&63)<<12|(i[++r]&63)<<6|(i[++r]&63)<<0,s>=65536?(s-=65536,n+=String.fromCharCode((s>>>10)+55296,(s&1023)+56320)):n+=String.fromCharCode(s);continue}console.error("decode.utf8Read(): Invalid byte "+o+" at offset "+r+". Skip to end of string: "+(e.offset+t));break}return e.offset+=t,n}function lu(i,e){return Er(i,e)<<24>>24}function Er(i,e){return i[e.offset++]}function cu(i,e){return La(i,e)<<16>>16}function La(i,e){return i[e.offset++]|i[e.offset++]<<8}function On(i,e){return i[e.offset++]|i[e.offset++]<<8|i[e.offset++]<<16|i[e.offset++]<<24}function Ws(i,e){return On(i,e)>>>0}function hu(i,e){return ss[0]=On(i,e),vx[0]}function fu(i,e){return ss[0]=On(i,e),ss[1]=On(i,e),yx[0]}function uu(i,e){const t=Ws(i,e);return On(i,e)*Math.pow(2,32)+t}function du(i,e){const t=Ws(i,e);return Ws(i,e)*Math.pow(2,32)+t}function Ex(i,e){return ss[0]=On(i,e),ss[1]=On(i,e),Mx[0]}function bx(i,e){return ss[0]=On(i,e),ss[1]=On(i,e),Sx[0]}function wx(i,e){return Er(i,e)>0}function Tx(i,e){const t=i[e.offset++];let n;return t<192?n=t&31:t===217?n=Er(i,e):t===218?n=La(i,e):t===219&&(n=Ws(i,e)),ou(i,e,n)}function Ax(i,e){const t=i[e.offset++];if(t<128)return t;if(t===202)return hu(i,e);if(t===203)return fu(i,e);if(t===204)return Er(i,e);if(t===205)return La(i,e);if(t===206)return Ws(i,e);if(t===207)return du(i,e);if(t===208)return lu(i,e);if(t===209)return cu(i,e);if(t===210)return On(i,e);if(t===211)return uu(i,e);if(t>223)return(255-t+1)*-1}function Cx(i,e){const t=i[e.offset];return t<192&&t>160||t===217||t===218||t===219}const yt={utf8Read:ou,int8:lu,uint8:Er,int16:cu,uint16:La,int32:On,uint32:Ws,float32:hu,float64:fu,int64:uu,uint64:du,bigint64:Ex,biguint64:bx,boolean:wx,string:Tx,number:Ax,stringCheck:Cx},nc={},Rx=new Map;function Bi(i,e){e.constructor&&(Rx.set(e.constructor,i),nc[i]=e),e.encode&&(wt[i]=e.encode),e.decode&&(yt[i]=e.decode)}function ic(i){return nc[i]}class xn{types={};schemas=new Map;hasFilters=!1;parentFiltered={};static inheritedTypes=new Map;static cachedContexts=new Map;static register(e){const t=Object.getPrototypeOf(e);if(t!==vt){let n=xn.inheritedTypes.get(t);n||(n=new Set,xn.inheritedTypes.set(t,n)),n.add(e)}}static cache(e){let t=xn.cachedContexts.get(e);return t||(t=new xn(e),xn.cachedContexts.set(e,t)),t}constructor(e){e&&this.discoverTypes(e)}has(e){return this.schemas.has(e)}get(e){return this.types[e]}add(e,t=this.schemas.size){return this.schemas.has(e)?!1:(this.types[t]=e,e[Symbol.metadata]===void 0&&fn.initialize(e),this.schemas.set(e,t),!0)}getTypeId(e){return this.schemas.get(e)}discoverTypes(e,t,n,s){if(s&&this.registerFilteredByParent(e,t,n),!this.add(e))return;xn.inheritedTypes.get(e)?.forEach(o=>{this.discoverTypes(o,t,n,s)});let r=e;for(;(r=Object.getPrototypeOf(r))&&r!==vt&&r!==Function.prototype;)this.discoverTypes(r);const a=e[Symbol.metadata]??={};a[hi]&&(this.hasFilters=!0);for(const o in a){const l=o,c=a[l].type,h=a[l].tag!==void 0;if(typeof c!="string")if(typeof c=="function")this.discoverTypes(c,e,l,s||h);else{const u=Object.values(c)[0];if(typeof u=="string")continue;this.discoverTypes(u,e,l,s||h)}}}registerFilteredByParent(e,t,n){let r=`${this.schemas.get(e)??this.schemas.size}`;t&&(r+=`-${this.schemas.get(t)}`),r+=`-${n}`,this.parentFiltered[r]=!0}debug(){let e="";for(const t in this.parentFiltered){const n=t.split("-").map(Number),s=n.pop();e+=`
		`,e+=`${t}: ${n.reverse().map((r,a)=>{const o=this.types[r],l=o[Symbol.metadata];let c=o.name;return a===0&&(c+=`[${l[s].name}]`),`${c}`}).join(" -> ")}`}return`TypeContext ->
	Schema types: ${this.schemas.size}
	hasFilters: ${this.hasFilters}
	parentFiltered:${e}`}}function Ui(i){if(Array.isArray(i))return{array:Ui(i[0])};if(typeof i.type<"u")return i.type;if(Px(i))return Object.keys(i).every(e=>typeof i[e]=="string")?"string":"number";if(typeof i=="object"&&i!==null){const e=Object.keys(i).find(t=>nc[t]!==void 0);if(e)return i[e]=Ui(i[e]),i}return i}function Px(i){if(typeof i=="function"&&i[Symbol.metadata])return!1;const e=Object.keys(i),t=e.filter(n=>/\d+/.test(n));return!!(t.length>0&&t.length===e.length/2&&i[i[t[0]]]==t[0]||e.length>0&&e.every(n=>typeof i[n]=="string"&&i[n]===n))}const fn={addField(i,e,t,n,s){if(e>64)throw new Error(`Can't define field '${t}'.
Schema instances may only have up to 64 fields.`);i[e]=Object.assign(i[e]||{},{type:Ui(n),index:e,name:t}),Object.defineProperty(i,Ri,{value:i[Ri]||{},enumerable:!1,configurable:!0}),s?(i[Ri][t]=s,i[Ri][`_${t}`]={value:void 0,writable:!0,enumerable:!1,configurable:!0}):i[Ri][t]={value:void 0,writable:!0,enumerable:!0,configurable:!0},Object.defineProperty(i,bn,{value:e,enumerable:!1,configurable:!0}),Object.defineProperty(i,t,{value:e,enumerable:!1,configurable:!0}),typeof i[e].type!="string"&&(i[Zi]===void 0&&Object.defineProperty(i,Zi,{value:[],enumerable:!1,configurable:!0}),i[Zi].push(e))},setTag(i,e,t){const n=i[e],s=i[n];s.tag=t,i[hi]||(Object.defineProperty(i,hi,{value:[],enumerable:!1,configurable:!0}),Object.defineProperty(i,Cs,{value:{},enumerable:!1,configurable:!0})),i[hi].push(n),i[Cs][t]||(i[Cs][t]=[]),i[Cs][t].push(n)},setFields(i,e){const t=i.prototype.constructor;xn.register(t);const n=Object.getPrototypeOf(t),s=n&&n[Symbol.metadata],r=fn.initialize(t);t[Os]||(t[Os]=vt[Os]),t[Zn]||(t[Zn]=vt[Zn]),t[Kn]||(t[Kn]=vt[Kn]),t.prototype.toJSON||(t.prototype.toJSON=vt.prototype.toJSON);let a=r[bn]??(s&&s[bn])??-1;a++;for(const o in e){const l=Ui(e[o]),c=typeof Object.keys(l)[0]=="string"&&ic(Object.keys(l)[0]),h=c?Object.values(l)[0]:l;fn.addField(r,a,o,l,gu(`_${o}`,a,h,c)),a++}return i},isDeprecated(i,e){return i[e].deprecated===!0},init(i){const e={};i[Symbol.metadata]=e,Object.defineProperty(e,bn,{value:0,enumerable:!1,configurable:!0})},initialize(i){const e=Object.getPrototypeOf(i),t=e[Symbol.metadata];let n=i[Symbol.metadata]??Object.create(null);return e!==vt&&n===t&&(n=Object.create(null),t&&(Object.setPrototypeOf(n,t),Object.defineProperty(n,bn,{value:t[bn],enumerable:!1,configurable:!0,writable:!0}),t[hi]!==void 0&&(Object.defineProperty(n,hi,{value:[...t[hi]],enumerable:!1,configurable:!0,writable:!0}),Object.defineProperty(n,Cs,{value:{...t[Cs]},enumerable:!1,configurable:!0,writable:!0})),t[Zi]!==void 0&&Object.defineProperty(n,Zi,{value:[...t[Zi]],enumerable:!1,configurable:!0,writable:!0}),Object.defineProperty(n,Ri,{value:{...t[Ri]},enumerable:!1,configurable:!0,writable:!0}))),Object.defineProperty(i,Symbol.metadata,{value:n,writable:!1,configurable:!0}),n},isValidInstance(i){return i.constructor[Symbol.metadata]&&Object.prototype.hasOwnProperty.call(i.constructor[Symbol.metadata],bn)},getFields(i){const e=i[Symbol.metadata],t={};for(let n=0;n<=e[bn];n++)t[e[n].name]=e[n].type;return t},hasViewTagAtIndex(i,e){return i?.[hi]?.includes(e)}};function ci(i){return{indexes:{},operations:[],queueRootNode:i}}function Is(){return{next:void 0,tail:void 0}}function _n(i,e){const t=i.indexes[e];t===void 0?i.indexes[e]=i.operations.push(e)-1:i.operations[t]=e}function Fh(i,e){let t=i.indexes[e];t===void 0&&(t=Object.values(i.indexes).at(-1),e=Object.entries(i.indexes).find(([n,s])=>s===t)?.[0]),i.operations[t]=void 0,delete i.indexes[e]}class br{ref;metadata;root;parentChain;isFiltered=!1;isVisibilitySharedWithParent;indexedOperations={};changes={indexes:{},operations:[]};allChanges={indexes:{},operations:[]};filteredChanges;allFilteredChanges;indexes;isNew=!0;constructor(e){this.ref=e,this.metadata=e.constructor[Symbol.metadata],this.metadata?.[hi]&&(this.allFilteredChanges={indexes:{},operations:[]},this.filteredChanges={indexes:{},operations:[]})}setRoot(e){this.root=e;const t=this.root.add(this);this.checkIsFiltered(this.parent,this.parentIndex,t),t&&this.forEachChild((n,s)=>{n.root!==e?n.setRoot(e):e.add(n)})}setParent(e,t,n){if(this.addParent(e,n),!t)return;const s=t.add(this);t!==this.root&&(this.root=t,this.checkIsFiltered(e,n,s)),s&&this.forEachChild((r,a)=>{if(r.root===t){t.add(r),t.moveNextToParent(r);return}r.setParent(this.ref,t,a)})}forEachChild(e){if(this.ref[ft]){if(typeof this.ref[ft]!="string")for(const[t,n]of this.ref.entries())n&&e(n[ne],this.indexes?.[t]??t)}else for(const t of this.metadata?.[Zi]??[]){const n=this.metadata[t],s=this.ref[n.name];s&&e(s[ne],t)}}operation(e){this.filteredChanges!==void 0?(this.filteredChanges.operations.push(-e),this.root?.enqueueChangeTree(this,"filteredChanges")):(this.changes.operations.push(-e),this.root?.enqueueChangeTree(this,"changes"))}change(e,t=_e.ADD){const n=this.isFiltered||this.metadata?.[e]?.tag!==void 0,s=n?this.filteredChanges:this.changes,r=this.indexedOperations[e];if(!r||r===_e.DELETE){const a=r&&r===_e.DELETE?_e.DELETE_AND_ADD:t;this.indexedOperations[e]=a}_n(s,e),n?(_n(this.allFilteredChanges,e),this.root&&(this.root.enqueueChangeTree(this,"filteredChanges"),this.root.enqueueChangeTree(this,"allFilteredChanges"))):(_n(this.allChanges,e),this.root?.enqueueChangeTree(this,"changes"))}shiftChangeIndexes(e){const t=this.isFiltered?this.filteredChanges:this.changes,n={},s={};for(const r in this.indexedOperations)n[Number(r)+e]=this.indexedOperations[r],s[Number(r)+e]=t.indexes[r];this.indexedOperations=n,t.indexes=s,t.operations=t.operations.map(r=>r+e)}shiftAllChangeIndexes(e,t=0){this.filteredChanges!==void 0?(this._shiftAllChangeIndexes(e,t,this.allFilteredChanges),this._shiftAllChangeIndexes(e,t,this.allChanges)):this._shiftAllChangeIndexes(e,t,this.allChanges)}_shiftAllChangeIndexes(e,t=0,n){const s={};let r=0;for(const a in n.indexes)s[r++]=n.indexes[a];n.indexes=s;for(let a=0;a<n.operations.length;a++){const o=n.operations[a];o>t&&(n.operations[a]=o+e)}}indexedOperation(e,t,n=e){this.indexedOperations[e]=t,this.filteredChanges!==void 0?(_n(this.allFilteredChanges,n),_n(this.filteredChanges,e),this.root?.enqueueChangeTree(this,"filteredChanges")):(_n(this.allChanges,n),_n(this.changes,e),this.root?.enqueueChangeTree(this,"changes"))}getType(e){return this.ref[ft]||this.metadata[e].type}getChange(e){return this.indexedOperations[e]}getValue(e,t=!1){return this.ref[Pn](e,t)}delete(e,t,n=e){if(e===void 0){try{throw new Error(`@colyseus/schema ${this.ref.constructor.name}: trying to delete non-existing index '${e}'`)}catch(a){console.warn(a)}return}const s=this.filteredChanges!==void 0?this.filteredChanges:this.changes;this.indexedOperations[e]=t??_e.DELETE,_n(s,e),Fh(this.allChanges,n);const r=this.getValue(e);return r&&r[ne]&&this.root?.remove(r[ne]),this.filteredChanges!==void 0?(Fh(this.allFilteredChanges,n),this.root?.enqueueChangeTree(this,"filteredChanges")):this.root?.enqueueChangeTree(this,"changes"),r}endEncode(e){this.indexedOperations={},this[e]=ci(),this.ref[Hs]?.(),this.isNew=!1}discard(e=!1){this.ref[Hs]?.(),this.indexedOperations={},this.changes=ci(this.changes.queueRootNode),this.filteredChanges!==void 0&&(this.filteredChanges=ci(this.filteredChanges.queueRootNode)),e&&(this.allChanges=ci(this.allChanges.queueRootNode),this.allFilteredChanges!==void 0&&(this.allFilteredChanges=ci(this.allFilteredChanges.queueRootNode)))}discardAll(){const e=Object.keys(this.indexedOperations);for(let t=0,n=e.length;t<n;t++){const s=this.getValue(Number(e[t]));s&&s[ne]&&s[ne].discardAll()}this.discard()}get changed(){return Object.entries(this.indexedOperations).length>0}checkIsFiltered(e,t,n){this.root.types.hasFilters&&(this._checkFilteredByParent(e,t),this.filteredChanges!==void 0&&(this.root?.enqueueChangeTree(this,"filteredChanges"),n&&this.root?.enqueueChangeTree(this,"allFilteredChanges"))),this.isFiltered||(this.root?.enqueueChangeTree(this,"changes"),n&&this.root?.enqueueChangeTree(this,"allChanges"))}_checkFilteredByParent(e,t){if(!e)return;const n=fn.isValidInstance(this.ref)?this.ref.constructor:this.ref[ft];let s,r=!fn.isValidInstance(e);r?(s=e[ne],e=s.parent,t=s.parentIndex):s=e[ne];const a=e.constructor;let o=`${this.root.types.getTypeId(n)}`;a&&(o+=`-${this.root.types.schemas.get(a)}`),o+=`-${t}`;const l=fn.hasViewTagAtIndex(a?.[Symbol.metadata],t);this.isFiltered=e[ne].isFiltered||this.root.types.parentFiltered[o]||l,this.isFiltered&&(this.isVisibilitySharedWithParent=s.isFiltered&&typeof n!="string"&&!l&&r,this.filteredChanges||(this.filteredChanges=ci(),this.allFilteredChanges=ci()),this.changes.operations.length>0&&(this.changes.operations.forEach(c=>_n(this.filteredChanges,c)),this.allChanges.operations.forEach(c=>_n(this.allFilteredChanges,c)),this.changes=ci(),this.allChanges=ci()))}get parent(){return this.parentChain?.ref}get parentIndex(){return this.parentChain?.index}addParent(e,t){if(this.hasParent((n,s)=>n[ne]===e[ne])){this.parentChain.index=t;return}this.parentChain={ref:e,index:t,next:this.parentChain}}removeParent(e=this.parent){let t=this.parentChain,n=null;for(;t;){if(t.ref[ne]===e[ne])return n?n.next=t.next:this.parentChain=t.next,!0;n=t,t=t.next}return this.parentChain===void 0}findParent(e){let t=this.parentChain;for(;t;){if(e(t.ref,t.index))return t;t=t.next}}hasParent(e){return this.findParent(e)!==void 0}getAllParents(){const e=[];let t=this.parentChain;for(;t;)e.push({ref:t.ref,index:t.index}),t=t.next;return e}}function sc(i,e,t,n,s,r){typeof t=="string"?wt[t]?.(e,n,r):t[Symbol.metadata]!==void 0?(wt.number(e,n[nt],r),(s&_e.ADD)===_e.ADD&&i.tryEncodeTypeId(e,t,n.constructor,r)):wt.number(e,n[nt],r)}const Dx=function(i,e,t,n,s,r,a,o,l){if(e[r.offset++]=(n|s)&255,s===_e.DELETE)return;const c=t.ref,h=l[n];sc(i,e,l[n].type,c[h.name],s,r)},rc=function(i,e,t,n,s,r){if(e[r.offset++]=s&255,wt.number(e,n,r),s===_e.DELETE)return;const a=t.ref;if((s&_e.ADD)===_e.ADD&&typeof a.set=="function"){const c=t.ref.$indexes.get(n);wt.string(e,c,r)}const o=a[ft],l=a[Pn](n);sc(i,e,o,l,s,r)},Ix=function(i,e,t,n,s,r,a,o){const l=t.ref,c=o&&t.isFiltered&&typeof t.getType(n)!="string";let h;if(c){const d=l.tmpItems[n];if(!d)return;h=d[nt],s===_e.DELETE?s=_e.DELETE_BY_REFID:s===_e.ADD&&(s=_e.ADD_BY_REFID)}else h=n;if(e[r.offset++]=s&255,wt.number(e,h,r),s===_e.DELETE||s===_e.DELETE_BY_REFID)return;const u=t.getType(n),f=t.getValue(n,a);sc(i,e,u,f,s,r)},pu=-1;function ac(i,e,t,n,s,r,a,o){const l=i.root,c=t[Pn](n);let h;if((e&_e.DELETE)===_e.DELETE){const u=c?.[nt];u!==void 0&&l.removeRef(u),e!==_e.DELETE_AND_ADD&&t[os](n),h=void 0}if(e!==_e.DELETE)if(vt.is(s)){const u=yt.number(r,a);if(h=l.refs.get(u),(e&_e.ADD)===_e.ADD){const f=i.getInstanceType(r,a,s);h||(h=i.createInstanceOfType(f)),l.addRef(u,h,h!==c||e===_e.DELETE_AND_ADD&&h===c)}}else if(typeof s=="string")h=yt[s](r,a);else{const u=ic(Object.keys(s)[0]),f=yt.number(r,a),d=l.refs.has(f)?c||l.refs.get(f):new u.constructor;if(h=d.clone(!0),h[ft]=Object.values(s)[0],c){let g=c[nt];if(g!==void 0&&f!==g){const v=c.entries();let m;for(;(m=v.next())&&!m.done;){const[p,y]=m.value;typeof y=="object"&&(g=y[nt],l.removeRef(g)),o.push({ref:c,refId:g,op:_e.DELETE,field:p,value:void 0,previousValue:y})}}}l.addRef(f,h,d!==c||e===_e.DELETE_AND_ADD&&d===c)}return{value:h,previousValue:c}}const Lx=function(i,e,t,n,s){const r=e[t.offset++],a=n.constructor[Symbol.metadata],o=r>>6<<6,l=r%(o||255),c=a[l];if(c===void 0)return console.warn("@colyseus/schema: field not defined at",{index:l,ref:n.constructor.name,metadata:a}),pu;const{value:h,previousValue:u}=ac(i,o,n,l,c.type,e,t,s);h!=null&&(n[c.name]=h),u!==h&&s.push({ref:n,refId:i.currentRefId,op:o,field:c.name,value:h,previousValue:u})},oc=function(i,e,t,n,s){const r=e[t.offset++];if(r===_e.CLEAR){i.removeChildRefs(n,s),n.clear();return}const a=yt.number(e,t),o=n[ft];let l;(r&_e.ADD)===_e.ADD?typeof n.set=="function"?(l=yt.string(e,t),n.setIndex(a,l)):l=a:l=n.getIndex(a);const{value:c,previousValue:h}=ac(i,r,n,a,o,e,t,s);if(c!=null){if(typeof n.set=="function")n.$items.set(l,c);else if(typeof n.$setAt=="function")n.$setAt(a,c,r);else if(typeof n.add=="function"){const u=n.add(c);typeof u=="number"&&n.setIndex(u,u)}}h!==c&&s.push({ref:n,refId:i.currentRefId,op:r,field:"",dynamicIndex:l,value:c,previousValue:h})},Ux=function(i,e,t,n,s){let r=e[t.offset++],a;if(r===_e.CLEAR){i.removeChildRefs(n,s),n.clear();return}else if(r===_e.REVERSE){n.reverse();return}else if(r===_e.DELETE_BY_REFID){const u=yt.number(e,t),f=i.root.refs.get(u);a=n.findIndex(d=>d===f),n[os](a),s.push({ref:n,refId:i.currentRefId,op:_e.DELETE,field:"",dynamicIndex:a,value:void 0,previousValue:f});return}else if(r===_e.ADD_BY_REFID){const u=yt.number(e,t),f=i.root.refs.get(u);f&&(a=n.findIndex(d=>d===f)),(a===-1||a===void 0)&&(a=n.length)}else a=yt.number(e,t);const o=n[ft];let l=a;const{value:c,previousValue:h}=ac(i,r,n,a,o,e,t,s);c!=null&&c!==h&&n.$setAt(a,c,r),h!==c&&s.push({ref:n,refId:i.currentRefId,op:r,field:"",dynamicIndex:l,value:c,previousValue:h})};class mu extends Error{}function Nx(i,e,t,n){let s,r=!1;switch(e){case"number":case"int8":case"uint8":case"int16":case"uint16":case"int32":case"uint32":case"int64":case"uint64":case"float32":case"float64":s="number",isNaN(i)&&console.log(`trying to encode "NaN" in ${t.constructor.name}#${n}`);break;case"bigint64":case"biguint64":s="bigint";break;case"string":s="string",r=!0;break;case"boolean":return;default:return}if(typeof i!==s&&(!r||r&&i!==null)){let a=`'${JSON.stringify(i)}'${i&&i.constructor&&` (${i.constructor.name})`||""}`;throw new mu(`a '${s}' was expected, but ${a} was provided in ${t.constructor.name}#${n}`)}}function Aa(i,e,t,n){if(!(i instanceof e))throw new mu(`a '${e.name}' was expected, but '${i&&i.constructor.name}' was provided in ${t.constructor.name}#${n}`)}const Fx=(i,e)=>{const t=i.toString(),n=e.toString();return t<n?-1:t>n?1:0};class jt{[ne];[nt];[ft];items=[];tmpItems=[];deletedIndexes={};isMovingItems=!1;static[Zn]=Ix;static[Kn]=Ux;static[js](e,t,n){return!n||typeof e[ft]=="string"||n.isChangeTreeVisible(e.tmpItems[t]?.[ne])}static is(e){return Array.isArray(e)||e.array!==void 0}static from(e){return new jt(...Array.from(e))}constructor(...e){Object.defineProperty(this,ft,{value:void 0,enumerable:!1,writable:!0,configurable:!0});const t=new Proxy(this,{get:(n,s)=>typeof s!="symbol"&&!isNaN(s)?this.items[s]:Reflect.get(n,s),set:(n,s,r)=>{if(typeof s!="symbol"&&!isNaN(s)){if(r==null)n.$deleteAt(s);else{if(r[ne]){Aa(r,n[ft],n,s);const a=n.items[s];n.isMovingItems?(a!==void 0?r[ne].isNew?n[ne].indexedOperation(Number(s),_e.MOVE_AND_ADD):(n[ne].getChange(Number(s))&_e.DELETE)===_e.DELETE?n[ne].indexedOperation(Number(s),_e.DELETE_AND_MOVE):n[ne].indexedOperation(Number(s),_e.MOVE):r[ne].isNew&&n[ne].indexedOperation(Number(s),_e.ADD),r[ne].setParent(this,n[ne].root,s)):n.$changeAt(Number(s),r),a!==void 0&&a[ne].root?.remove(a[ne])}else n.$changeAt(Number(s),r);n.items[s]=r,n.tmpItems[s]=r}return!0}else return Reflect.set(n,s,r)},deleteProperty:(n,s)=>(typeof s=="number"?n.$deleteAt(s):delete n[s],!0),has:(n,s)=>typeof s!="symbol"&&!isNaN(Number(s))?Reflect.has(this.items,s):Reflect.has(n,s)});return Object.defineProperty(this,ne,{value:new br(t),enumerable:!1,writable:!0}),e.length>0&&this.push(...e),t}set length(e){e===0?this.clear():e<this.items.length?this.splice(e,this.length-e):console.warn("ArraySchema: can't set .length to a higher value than its length.")}get length(){return this.items.length}push(...e){let t=this.tmpItems.length;const n=this[ne];for(let s=0,r=e.length;s<r;s++,t++){const a=e[s];if(a==null)return;typeof a=="object"&&this[ft]&&Aa(a,this[ft],this,s),n.indexedOperation(t,_e.ADD,this.items.length),this.items.push(a),this.tmpItems.push(a),a[ne]?.setParent(this,n.root,t)}return t}pop(){let e=-1;for(let t=this.tmpItems.length-1;t>=0;t--)if(this.deletedIndexes[t]!==!0){e=t;break}if(!(e<0))return this[ne].delete(e,void 0,this.items.length-1),this.deletedIndexes[e]=!0,this.items.pop()}at(e){return e<0&&(e+=this.length),this.items[e]}$changeAt(e,t){if(t==null){console.error("ArraySchema items cannot be null nor undefined; Use `deleteAt(index)` instead.");return}if(this.items[e]===t)return;const n=this.items[e]!==void 0?typeof t=="object"?_e.DELETE_AND_ADD:_e.REPLACE:_e.ADD,s=this[ne];s.change(e,n),t[ne]?.setParent(this,s.root,e)}$deleteAt(e,t){this[ne].delete(e,t)}$setAt(e,t,n){e===0&&n===_e.ADD&&this.items[e]!==void 0?this.items.unshift(t):n===_e.DELETE_AND_MOVE?(this.items.splice(e,1),this.items[e]=t):this.items[e]=t}clear(){if(this.items.length===0)return;const e=this[ne];e.forEachChild((t,n)=>{e.root?.remove(t)}),e.discard(!0),e.operation(_e.CLEAR),this.items.length=0,this.tmpItems.length=0}concat(...e){return new jt(...this.items.concat(...e))}join(e){return this.items.join(e)}reverse(){return this[ne].operation(_e.REVERSE),this.items.reverse(),this.tmpItems.reverse(),this}shift(){if(this.items.length===0)return;const e=this[ne],t=this.tmpItems.findIndex(s=>s===this.items[0]),n=this.items.findIndex(s=>s===this.items[0]);return e.delete(t,_e.DELETE,n),e.shiftAllChangeIndexes(-1,n),this.deletedIndexes[t]=!0,this.items.shift()}slice(e,t){const n=new jt;return n.push(...this.items.slice(e,t)),n}sort(e=Fx){this.isMovingItems=!0;const t=this[ne];return this.items.sort(e).forEach((s,r)=>t.change(r,_e.REPLACE)),this.tmpItems.sort(e),this.isMovingItems=!1,this}splice(e,t,...n){const s=this[ne],r=this.items.length,a=this.tmpItems.length,o=n.length,l=[];for(let c=0;c<a;c++)this.deletedIndexes[c]!==!0&&l.push(c);if(r>e){t===void 0&&(t=r-e);for(let c=e;c<e+t;c++){const h=l[c];s.delete(h,_e.DELETE),this.deletedIndexes[h]=!0}}else t=0;if(o>0){if(o>t)throw console.error("Inserting more elements than deleting during ArraySchema#splice()"),new Error("ArraySchema#splice(): insertCount must be equal or lower than deleteCount.");for(let c=0;c<o;c++){const h=(l[e]??r)+c;s.indexedOperation(h,this.deletedIndexes[h]?_e.DELETE_AND_ADD:_e.ADD),n[c][ne]?.setParent(this,s.root,h)}}return t>o&&s.shiftAllChangeIndexes(-(t-o),l[e+o]),s.filteredChanges!==void 0?s.root?.enqueueChangeTree(s,"filteredChanges"):s.root?.enqueueChangeTree(s,"changes"),this.items.splice(e,t,...n)}unshift(...e){const t=this[ne];return t.shiftChangeIndexes(e.length),t.isFiltered?_n(t.filteredChanges,this.items.length):_n(t.allChanges,this.items.length),e.forEach((n,s)=>{t.change(s,_e.ADD)}),this.tmpItems.unshift(...e),this.items.unshift(...e)}indexOf(e,t){return this.items.indexOf(e,t)}lastIndexOf(e,t=this.length-1){return this.items.lastIndexOf(e,t)}every(e,t){return this.items.every(e,t)}some(e,t){return this.items.some(e,t)}forEach(e,t){return this.items.forEach(e,t)}map(e,t){return this.items.map(e,t)}filter(e,t){return this.items.filter(e,t)}reduce(e,t){return this.items.reduce(e,t)}reduceRight(e,t){return this.items.reduceRight(e,t)}find(e,t){return this.items.find(e,t)}findIndex(e,t){return this.items.findIndex(e,t)}fill(e,t,n){throw new Error("ArraySchema#fill() not implemented")}copyWithin(e,t,n){throw new Error("ArraySchema#copyWithin() not implemented")}toString(){return this.items.toString()}toLocaleString(){return this.items.toLocaleString()}[Symbol.iterator](){return this.items[Symbol.iterator]()}static get[Symbol.species](){return jt}[Symbol.unscopables];entries(){return this.items.entries()}keys(){return this.items.keys()}values(){return this.items.values()}includes(e,t){return this.items.includes(e,t)}flatMap(e,t){throw new Error("ArraySchema#flatMap() is not supported.")}flat(e){throw new Error("ArraySchema#flat() is not supported.")}findLast(){return this.items.findLast.apply(this.items,arguments)}findLastIndex(...e){return this.items.findLastIndex.apply(this.items,arguments)}with(e,t){const n=this.items.slice();return e<0&&(e+=this.length),n[e]=t,new jt(...n)}toReversed(){return this.items.slice().reverse()}toSorted(e){return this.items.slice().sort(e)}toSpliced(e,t,...n){return this.items.toSpliced.apply(copy,arguments)}shuffle(){return this.move(e=>{let t=this.items.length;for(;t!=0;){let n=Math.floor(Math.random()*t);t--,[this[t],this[n]]=[this[n],this[t]]}})}move(e){return this.isMovingItems=!0,e(this),this.isMovingItems=!1,this}[Pn](e,t=!1){return t?this.items[e]:this.deletedIndexes[e]?this.items[e]:this.tmpItems[e]||this.items[e]}[os](e){this.items[e]=void 0,this.tmpItems[e]=void 0}[Hs](){this.tmpItems=this.items.slice(),this.deletedIndexes={}}[bl](){this.items=this.items.filter(e=>e!==void 0),this.tmpItems=this.items.slice()}toArray(){return this.items.slice(0)}toJSON(){return this.toArray().map(e=>typeof e.toJSON=="function"?e.toJSON():e)}clone(e){let t;return e?(t=new jt,t.push(...this.items)):t=new jt(...this.map(n=>n[ne]?n.clone():n)),t}}Bi("array",{constructor:jt});class ln{[ne];[nt];childType;[ft];$items=new Map;$indexes=new Map;deletedItems={};static[Zn]=rc;static[Kn]=oc;static[js](e,t,n){return!n||typeof e[ft]=="string"||n.isChangeTreeVisible((e[Pn](t)??e.deletedItems[t])[ne])}static is(e){return e.map!==void 0}constructor(e){const t=new br(this);if(t.indexes={},Object.defineProperty(this,ne,{value:t,enumerable:!1,writable:!0}),e)if(e instanceof Map||e instanceof ln)e.forEach((n,s)=>this.set(s,n));else for(const n in e)this.set(n,e[n]);Object.defineProperty(this,ft,{value:void 0,enumerable:!1,writable:!0,configurable:!0})}[Symbol.iterator](){return this.$items[Symbol.iterator]()}get[Symbol.toStringTag](){return this.$items[Symbol.toStringTag]}static get[Symbol.species](){return ln}set(e,t){if(t==null)throw new Error(`MapSchema#set('${e}', ${t}): trying to set ${t} value on '${e}'.`);typeof t=="object"&&this[ft]&&Aa(t,this[ft],this,e),e=e.toString();const n=this[ne],s=t[ne]!==void 0;let r,a;if(typeof n.indexes[e]<"u"){r=n.indexes[e],a=_e.REPLACE;const o=this.$items.get(e);if(o===t)return;s&&(a=_e.DELETE_AND_ADD,o!==void 0&&o[ne].root?.remove(o[ne])),this.deletedItems[r]&&delete this.deletedItems[r]}else r=n.indexes[bn]??0,a=_e.ADD,this.$indexes.set(r,e),n.indexes[e]=r,n.indexes[bn]=r+1;return this.$items.set(e,t),n.change(r,a),s&&t[ne].setParent(this,n.root,r),this}get(e){return this.$items.get(e)}delete(e){if(!this.$items.has(e))return!1;const t=this[ne].indexes[e];return this.deletedItems[t]=this[ne].delete(t),this.$items.delete(e)}clear(){const e=this[ne];e.discard(!0),e.indexes={},e.forEachChild((t,n)=>{e.root?.remove(t)}),this.$indexes.clear(),this.$items.clear(),e.operation(_e.CLEAR)}has(e){return this.$items.has(e)}forEach(e){this.$items.forEach(e)}entries(){return this.$items.entries()}keys(){return this.$items.keys()}values(){return this.$items.values()}get size(){return this.$items.size}setIndex(e,t){this.$indexes.set(e,t)}getIndex(e){return this.$indexes.get(e)}[Pn](e){return this.$items.get(this.$indexes.get(e))}[os](e){const t=this.$indexes.get(e);this.$items.delete(t),this.$indexes.delete(e)}[Hs](){const e=this[ne];for(const t in this.deletedItems){const n=parseInt(t),s=this.$indexes.get(n);delete e.indexes[s],this.$indexes.delete(n)}this.deletedItems={}}toJSON(){const e={};return this.forEach((t,n)=>{e[n]=typeof t.toJSON=="function"?t.toJSON():t}),e}clone(e){let t;return e?t=Object.assign(new ln,this):(t=new ln,this.forEach((n,s)=>{n[ne]?t.set(s,n.clone()):t.set(s,n)})),t}}Bi("map",{constructor:ln});class Xs{[ne];[nt];[ft];$items=new Map;$indexes=new Map;deletedItems={};$refId=0;static[Zn]=rc;static[Kn]=oc;static[js](e,t,n){return!n||typeof e[ft]=="string"||n.isChangeTreeVisible((e[Pn](t)??e.deletedItems[t])[ne])}static is(e){return e.collection!==void 0}constructor(e){this[ne]=new br(this),this[ne].indexes={},e&&e.forEach(t=>this.add(t)),Object.defineProperty(this,ft,{value:void 0,enumerable:!1,writable:!0,configurable:!0})}add(e){const t=this.$refId++;return e[ne]!==void 0&&e[ne].setParent(this,this[ne].root,t),this[ne].indexes[t]=t,this.$indexes.set(t,t),this.$items.set(t,e),this[ne].change(t),t}at(e){const t=Array.from(this.$items.keys())[e];return this.$items.get(t)}entries(){return this.$items.entries()}delete(e){const t=this.$items.entries();let n,s;for(;(s=t.next())&&!s.done;)if(e===s.value[1]){n=s.value[0];break}return n===void 0?!1:(this.deletedItems[n]=this[ne].delete(n),this.$indexes.delete(n),this.$items.delete(n))}clear(){const e=this[ne];e.discard(!0),e.indexes={},e.forEachChild((t,n)=>{e.root?.remove(t)}),this.$indexes.clear(),this.$items.clear(),e.operation(_e.CLEAR)}has(e){return Array.from(this.$items.values()).some(t=>t===e)}forEach(e){this.$items.forEach((t,n,s)=>e(t,n,this))}values(){return this.$items.values()}get size(){return this.$items.size}[Symbol.iterator](){return this.$items.values()}setIndex(e,t){this.$indexes.set(e,t)}getIndex(e){return this.$indexes.get(e)}[Pn](e){return this.$items.get(this.$indexes.get(e))}[os](e){const t=this.$indexes.get(e);this.$items.delete(t),this.$indexes.delete(e)}[Hs](){this.deletedItems={}}toArray(){return Array.from(this.$items.values())}toJSON(){const e=[];return this.forEach((t,n)=>{e.push(typeof t.toJSON=="function"?t.toJSON():t)}),e}clone(e){let t;return e?t=Object.assign(new Xs,this):(t=new Xs,this.forEach(n=>{n[ne]?t.add(n.clone()):t.add(n)})),t}}Bi("collection",{constructor:Xs});class $s{[ne];[nt];[ft];$items=new Map;$indexes=new Map;deletedItems={};$refId=0;static[Zn]=rc;static[Kn]=oc;static[js](e,t,n){return!n||typeof e[ft]=="string"||n.visible.has((e[Pn](t)??e.deletedItems[t])[ne])}static is(e){return e.set!==void 0}constructor(e){this[ne]=new br(this),this[ne].indexes={},e&&e.forEach(t=>this.add(t)),Object.defineProperty(this,ft,{value:void 0,enumerable:!1,writable:!0,configurable:!0})}add(e){if(this.has(e))return!1;const t=this.$refId++;e[ne]!==void 0&&e[ne].setParent(this,this[ne].root,t);const n=this[ne].indexes[t]?.op??_e.ADD;return this[ne].indexes[t]=t,this.$indexes.set(t,t),this.$items.set(t,e),this[ne].change(t,n),t}entries(){return this.$items.entries()}delete(e){const t=this.$items.entries();let n,s;for(;(s=t.next())&&!s.done;)if(e===s.value[1]){n=s.value[0];break}return n===void 0?!1:(this.deletedItems[n]=this[ne].delete(n),this.$indexes.delete(n),this.$items.delete(n))}clear(){const e=this[ne];e.discard(!0),e.indexes={},this.$indexes.clear(),this.$items.clear(),e.operation(_e.CLEAR)}has(e){const t=this.$items.values();let n=!1,s;for(;(s=t.next())&&!s.done;)if(e===s.value){n=!0;break}return n}forEach(e){this.$items.forEach((t,n,s)=>e(t,n,this))}values(){return this.$items.values()}get size(){return this.$items.size}[Symbol.iterator](){return this.$items.values()}setIndex(e,t){this.$indexes.set(e,t)}getIndex(e){return this.$indexes.get(e)}[Pn](e){return this.$items.get(this.$indexes.get(e))}[os](e){const t=this.$indexes.get(e);this.$items.delete(t),this.$indexes.delete(e)}[Hs](){this.deletedItems={}}toArray(){return Array.from(this.$items.values())}toJSON(){const e=[];return this.forEach((t,n)=>{e.push(typeof t.toJSON=="function"?t.toJSON():t)}),e}clone(e){let t;return e?t=Object.assign(new $s,this):(t=new $s,this.forEach(n=>{n[ne]?t.add(n.clone()):t.add(n)})),t}}Bi("set",{constructor:$s});const lc=-1;function Ox(i=lc){return function(e,t){const n=e.constructor,r=Object.getPrototypeOf(n)[Symbol.metadata],a=n[Symbol.metadata]??=Object.assign({},n[Symbol.metadata],r??Object.create(null));fn.setTag(a,t,i)}}function Mn(i,e){return function(t,n){const s=t.constructor;if(!i)throw new Error(`${s.name}: @type() reference provided for "${n}" is undefined. Make sure you don't have any circular dependencies.`);i=Ui(i),xn.register(s);const a=Object.getPrototypeOf(s)[Symbol.metadata],o=fn.initialize(s);let l=o[n];if(o[l]!==void 0){if(o[l].deprecated)return;if(o[l].type!==void 0)try{throw new Error(`@colyseus/schema: Duplicate '${n}' definition on '${s.name}'.
Check @type() annotation`)}catch(c){const h=c.stack.split(`
`)[4].trim();throw new Error(`${c.message} ${h}`)}}else l=o[bn]??(a&&a[bn])??-1,l++;{const c=typeof Object.keys(i)[0]=="string"&&ic(Object.keys(i)[0]),h=c?Object.values(i)[0]:i;fn.addField(o,l,n,i,gu(`_${n}`,l,h,c))}}}function gu(i,e,t,n){return{get:function(){return this[i]},set:function(s){const r=this[i]??void 0;if(s!==r){if(s!=null){n?(n.constructor===jt&&!(s instanceof jt)&&(s=new jt(...s)),n.constructor===ln&&!(s instanceof ln)&&(s=new ln(s)),s[ft]=t):typeof t!="string"?Aa(s,t,this,i.substring(1)):Nx(s,t,this,i.substring(1));const a=this[ne];r!==void 0&&r[ne]?(a.root?.remove(r[ne]),this.constructor[Os](a,e,_e.DELETE_AND_ADD)):this.constructor[Os](a,e,_e.ADD),s[ne]?.setParent(this,a.root,e)}else r!==void 0&&this[ne].delete(e);this[i]=s}},enumerable:!0,configurable:!0}}function hc(i,e,t){for(let n in e)Mn(e[n])(i.prototype,n);return i}function Ua(i,e,t=vt){const n={},s={},r={},a={};for(let h in i){const u=i[h];typeof u=="object"?(u.view!==void 0&&(a[h]=typeof u.view=="boolean"?lc:u.view),u.sync!==!1&&(n[h]=Ui(u)),Object.prototype.hasOwnProperty.call(u,"default")?r[h]=u.default:Array.isArray(u)||u.array!==void 0?r[h]=new jt:u.map!==void 0?r[h]=new ln:u.collection!==void 0?r[h]=new Xs:u.set!==void 0?r[h]=new $s:u.type!==void 0&&vt.is(u.type)&&(!u.type.prototype.initialize||u.type.prototype.initialize.length===0)&&(r[h]=new u.type)):typeof u=="function"?vt.is(u)?((!u.prototype.initialize||u.prototype.initialize.length===0)&&(r[h]=new u),n[h]=Ui(u)):s[h]=u:n[h]=Ui(u)}const o=()=>{const h={};for(const u in r){const f=r[u];f&&typeof f.clone=="function"?h[u]=f.clone():h[u]=f}return h},l=h=>{const u=Object.keys(n),f={};for(const d in h)u.includes(d)||(f[d]=h[d]);return f},c=fn.setFields(class extends t{constructor(...h){s.initialize&&typeof s.initialize=="function"?(super(Object.assign({},o(),l(h[0]||{}))),new.target===c&&s.initialize.apply(this,h)):super(Object.assign({},o(),h[0]||{}))}},n);c._getDefaultValues=o,Object.assign(c.prototype,s);for(let h in a)Ox(a[h])(c.prototype,h);return e&&Object.defineProperty(c,"name",{value:e}),c.extends=(h,u)=>Ua(h,u,c),c}function ra(i){return new Array(i).fill(0).map((e,t)=>t===i-1?"└─ ":"   ").join("")}class vt{static[Symbol.metadata];static[Zn]=Dx;static[Kn]=Lx;[nt];static initialize(e){Object.defineProperty(e,ne,{value:new br(e),enumerable:!1,writable:!0}),Object.defineProperties(e,e.constructor[Symbol.metadata]?.[Ri]||{})}static is(e){return typeof e[Symbol.metadata]=="object"}static isSchema(e){return typeof e?.assign=="function"}static[Os](e,t,n=_e.ADD){e.change(t,n)}static[js](e,t,n){const r=e.constructor[Symbol.metadata][t]?.tag;if(n===void 0)return r===void 0;if(r===void 0)return!0;if(r===lc)return n.isChangeTreeVisible(e[ne]);{const a=n.tags?.get(e[ne]);return a&&a.has(r)}}constructor(e){vt.initialize(this),e&&Object.assign(this,e)}assign(e){return Object.assign(this,e),this}restore(e){const t=this.constructor[Symbol.metadata];for(const n in t){const s=t[n],r=s.name,a=s.type,o=e[r];if(o!=null){if(typeof a=="string")this[r]=o;else if(vt.is(a)){const l=new a;l.restore(o),this[r]=l}else if(typeof a=="object"){const l=Object.keys(a)[0],c=a[l];if(l==="map"){const h=this[r];for(const u in o)if(vt.is(c)){const f=new c;f.restore(o[u]),h.set(u,f)}else h.set(u,o[u])}else if(l==="array"){const h=this[r];for(let u=0;u<o.length;u++)if(vt.is(c)){const f=new c;f.restore(o[u]),h.push(f)}else h.push(o[u])}}}}return this}setDirty(e,t){const n=this.constructor[Symbol.metadata];this[ne].change(n[n[e]].index,t)}clone(){const e=Object.create(this.constructor.prototype);vt.initialize(e);const t=this.constructor[Symbol.metadata];for(const n in t){const s=t[n].name;typeof this[s]=="object"&&typeof this[s]?.clone=="function"?e[s]=this[s].clone():e[s]=this[s]}return e}toJSON(){const e={},t=this.constructor[Symbol.metadata];for(const n in t){const s=t[n],r=s.name;!s.deprecated&&this[r]!==null&&typeof this[r]<"u"&&(e[r]=typeof this[r].toJSON=="function"?this[r].toJSON():this[r])}return e}discardAllChanges(){this[ne].discardAll()}[Pn](e){const t=this.constructor[Symbol.metadata];return this[t[e].name]}[os](e){const t=this.constructor[Symbol.metadata];this[t[e].name]=void 0}static debugRefIds(e,t=!1,n=0,s,r=""){const a=t?` - ${JSON.stringify(e.toJSON())}`:"",o=e[ne],l=e[nt],c=s?s.root:o.root,h=c?.refCount?.[l]>1?` [×${c.refCount[l]}]`:"";let u=`${ra(n)}${r}${e.constructor.name} (refId: ${l})${h}${a}
`;return o.forEachChild((f,d)=>{let g=d;typeof d=="number"&&e.$indexes&&(g=e.$indexes.get(d)??d);const v=e.forEach!==void 0&&g!==void 0?`["${g}"]: `:"";u+=this.debugRefIds(f.ref,t,n+1,s,v)}),u}static debugRefIdEncodingOrder(e,t="allChanges"){let n=[],s=e[ne].root[t].next;for(;s;)s.changeTree&&n.push(s.changeTree.ref[nt]),s=s.next;return n}static debugRefIdsFromDecoder(e){return this.debugRefIds(e.state,!1,0,e)}static debugChanges(e,t=!1){const n=e[ne],s=t?n.allChanges:n.changes,r=t?"allChanges":"changes";let a=`${e.constructor.name} (${e[nt]}) -> .${r}:
`;function o(l){l.operations.filter(c=>c).forEach(c=>{const h=n.indexedOperations[c];a+=`- [${c}]: ${_e[h]} (${JSON.stringify(n.getValue(Number(c),t))})
`})}return o(s),!t&&n.filteredChanges&&n.filteredChanges.operations.filter(l=>l).length>0&&(a+=`${e.constructor.name} (${e[nt]}) -> .filteredChanges:
`,o(n.filteredChanges)),t&&n.allFilteredChanges&&n.allFilteredChanges.operations.filter(l=>l).length>0&&(a+=`${e.constructor.name} (${e[nt]}) -> .allFilteredChanges:
`,o(n.allFilteredChanges)),a}static debugChangesDeep(e,t="changes"){let n="";const s=e[ne],r=s.root,a=new Map,o=[];let l=0;for(const[h,u]of Object.entries(r[t])){const f=r.changeTrees[h];if(!f)continue;let d=!1,g=[],v=f.parent?.[ne];if(f===s)d=!0;else for(;v!==void 0;){if(g.push(v),v.ref===e){d=!0;break}v=v.parent?.[ne]}d&&(o.push(f.ref[nt]),l+=Object.keys(u).length,a.set(f,g.reverse()))}n+=`---
`,n+=`root refId: ${s.ref[nt]}
`,n+=`Total instances: ${o.length} (refIds: ${o.join(", ")})
`,n+=`Total changes: ${l}
`,n+=`---
`;const c=new WeakSet;for(const[h,u]of a.entries()){u.forEach((m,p)=>{c.has(m)||(n+=`${ra(p)}${m.ref.constructor.name} (refId: ${m.ref[nt]})
`,c.add(m))});const f=h.indexedOperations,d=u.length,g=ra(d),v=d>0?`(${h.parentIndex}) `:"";n+=`${g}${v}${h.ref.constructor.name} (refId: ${h.ref[nt]}) - changes: ${Object.keys(f).length}
`;for(const m in f){const p=f[m];n+=`${ra(d+1)}${_e[p]}: ${m}
`}}return`${n}`}}class Bx{types;nextUniqueId=0;refCount={};changeTrees={};allChanges=Is();allFilteredChanges=Is();changes=Is();filteredChanges=Is();constructor(e){this.types=e}getNextUniqueId(){return this.nextUniqueId++}add(e){const t=e.ref;t[nt]===void 0&&Object.defineProperty(t,nt,{value:this.getNextUniqueId(),enumerable:!1,writable:!0});const n=t[nt],s=this.changeTrees[n]===void 0;s&&(this.changeTrees[n]=e);const r=this.refCount[n];if(r===0){const a=e.allChanges.operations;let o=a.length;for(;o--;)e.indexedOperations[a[o]]=_e.ADD,_n(e.changes,o)}return this.refCount[n]=(r||0)+1,s}remove(e){const t=e.ref[nt],n=this.refCount[t]-1;return n<=0?(e.root=void 0,delete this.changeTrees[t],this.removeChangeFromChangeSet("allChanges",e),this.removeChangeFromChangeSet("changes",e),e.filteredChanges&&(this.removeChangeFromChangeSet("allFilteredChanges",e),this.removeChangeFromChangeSet("filteredChanges",e)),this.refCount[t]=0,e.forEachChild((s,r)=>{s.removeParent(e.ref)&&(s.parentChain===void 0||s.parentChain&&this.refCount[s.ref[nt]]>0?this.remove(s):s.parentChain&&this.moveNextToParent(s))})):(this.refCount[t]=n,this.recursivelyMoveNextToParent(e)),n}recursivelyMoveNextToParent(e){this.moveNextToParent(e),e.forEachChild((t,n)=>this.recursivelyMoveNextToParent(t))}moveNextToParent(e){e.filteredChanges?(this.moveNextToParentInChangeTreeList("filteredChanges",e),this.moveNextToParentInChangeTreeList("allFilteredChanges",e)):(this.moveNextToParentInChangeTreeList("changes",e),this.moveNextToParentInChangeTreeList("allChanges",e))}moveNextToParentInChangeTreeList(e,t){const n=this[e],s=t[e].queueRootNode;if(!s)return;const r=t.parent;if(!r||!r[ne])return;const a=r[ne][e]?.queueRootNode;if(!a||a===s)return;const o=a.position;s.position>o||(s.prev?s.prev.next=s.next:n.next=s.next,s.next?s.next.prev=s.prev:n.tail=s.prev,s.prev=a,s.next=a.next,a.next?a.next.prev=s:n.tail=s,a.next=s,this.updatePositionsAfterMove(n,s,o+1))}enqueueChangeTree(e,t,n=e[t].queueRootNode){n||(e[t].queueRootNode=this.addToChangeTreeList(this[t],e))}addToChangeTreeList(e,t){const n={changeTree:t,next:void 0,prev:void 0,position:e.tail?e.tail.position+1:0};return e.next?(n.prev=e.tail,e.tail.next=n,e.tail=n):(e.next=n,e.tail=n),n}updatePositionsAfterRemoval(e,t){let n=e.next,s=0;for(;n;)s>=t&&(n.position=s),n=n.next,s++}updatePositionsAfterMove(e,t,n){let s=e.next,r=0;for(;s;)s.position=r,s=s.next,r++}removeChangeFromChangeSet(e,t){const n=this[e],s=t[e].queueRootNode;if(s&&s.changeTree===t){const r=s.position;return s.prev?s.prev.next=s.next:n.next=s.next,s.next?s.next.prev=s.prev:n.tail=s.prev,this.updatePositionsAfterRemoval(n,r),t[e].queueRootNode=void 0,!0}return!1}}function Oh(i,e){const t=new Uint8Array(i.length+e.length);return t.set(i,0),t.set(e,i.length),t}class fr{static BUFFER_SIZE=8*1024;sharedBuffer=new Uint8Array(fr.BUFFER_SIZE);context;state;root;constructor(e){this.context=xn.cache(e.constructor),this.root=new Bx(this.context),this.setState(e)}setState(e){this.state=e,this.state[ne].setRoot(this.root)}encode(e={offset:0},t,n=this.sharedBuffer,s="changes",r=s==="allChanges",a=e.offset){const o=t!==void 0,l=this.state[ne];let c=this.root[s];for(;c=c.next;){const h=c.changeTree;if(o){if(!t.isChangeTreeVisible(h)){t.invisible.add(h);continue}t.invisible.delete(h)}const u=h[s],f=h.ref,d=u.operations.length;if(d===0)continue;const g=f.constructor,v=g[Zn],m=g[js],p=g[Symbol.metadata];(o||e.offset>a||h!==l)&&(n[e.offset++]=Ta&255,wt.number(n,f[nt],e));for(let y=0;y<d;y++){const w=u.operations[y];if(w<0){n[e.offset++]=Math.abs(w)&255;continue}const M=r?_e.ADD:h.indexedOperations[w];w===void 0||M===void 0||m&&!m(f,w,t)||v(this,n,h,w,M,e,r,o,p)}}if(e.offset>n.byteLength){const h=Math.ceil(e.offset/fr.BUFFER_SIZE)*fr.BUFFER_SIZE;console.warn(`@colyseus/schema buffer overflow. Encoded state is higher than default BUFFER_SIZE. Use the following to increase default BUFFER_SIZE:

    import { Encoder } from "@colyseus/schema";
    Encoder.BUFFER_SIZE = 2 * 1024 * 1024; // 2MB
`);const u=new Uint8Array(h);return u.set(n),n=u,n===this.sharedBuffer&&(this.sharedBuffer=n),this.encode({offset:a},t,n,s,r)}else return n.subarray(0,e.offset)}encodeAll(e={offset:0},t=this.sharedBuffer){return this.encode(e,void 0,t,"allChanges",!0)}encodeAllView(e,t,n,s=this.sharedBuffer){const r=n.offset;return this.encode(n,e,s,"allFilteredChanges",!0,r),Oh(s.subarray(0,t),s.subarray(r,n.offset))}encodeView(e,t,n,s=this.sharedBuffer){const r=n.offset;for(const[a,o]of e.changes){const l=this.root.changeTrees[a];if(l===void 0){e.changes.delete(a);continue}const c=Object.keys(o);if(c.length===0)continue;const h=l.ref,u=h.constructor,f=u[Zn],d=u[Symbol.metadata];s[n.offset++]=Ta&255,wt.number(s,h[nt],n);for(let g=0,v=c.length;g<v;g++){const m=Number(c[g]),y=l.ref[Pn](m)!==void 0&&o[m]||_e.DELETE;f(this,s,l,m,y,n,!1,!0,d)}}return e.changes.clear(),this.encode(n,e,s,"filteredChanges",!1,r),Oh(s.subarray(0,t),s.subarray(r,n.offset))}discardChanges(){let e=this.root.changes.next;for(;e;)e.changeTree.endEncode("changes"),e=e.next;for(this.root.changes=Is(),e=this.root.filteredChanges.next;e;)e.changeTree.endEncode("filteredChanges"),e=e.next;this.root.filteredChanges=Is()}tryEncodeTypeId(e,t,n,s){const r=this.context.getTypeId(t),a=this.context.getTypeId(n);if(a===void 0){console.warn(`@colyseus/schema WARNING: Class "${n.name}" is not registered on TypeRegistry - Please either tag the class with @entity or define a @type() field.`);return}r!==a&&(e[s.offset++]=Kf&255,wt.number(e,a,s))}get hasChanges(){return this.root.changes.next!==void 0||this.root.filteredChanges.next!==void 0}}function zx(i,e){if(e===-1||e>=i.length)return!1;const t=i.length-1;for(let n=e;n<t;n++)i[n]=i[n+1];return i.length=t,!0}class Bh extends Error{constructor(e){super(e),this.name="DecodingWarning"}}class kx{refs=new Map;refCount={};deletedRefs=new Set;callbacks={};nextUniqueId=0;getNextUniqueId(){return this.nextUniqueId++}addRef(e,t,n=!0){this.refs.set(e,t),Object.defineProperty(t,nt,{value:e,enumerable:!1,writable:!0}),n&&(this.refCount[e]=(this.refCount[e]||0)+1),this.deletedRefs.has(e)&&this.deletedRefs.delete(e)}removeRef(e){const t=this.refCount[e];if(t===void 0){try{throw new Bh("trying to remove refId that doesn't exist: "+e)}catch(n){console.warn(n)}return}if(t===0){try{const n=this.refs.get(e);throw new Bh(`trying to remove refId '${e}' with 0 refCount (${n.constructor.name}: ${JSON.stringify(n)})`)}catch(n){console.warn(n)}return}(this.refCount[e]=t-1)<=0&&this.deletedRefs.add(e)}clearRefs(){this.refs.clear(),this.deletedRefs.clear(),this.callbacks={},this.refCount={}}garbageCollectDeletedRefs(){this.deletedRefs.forEach(e=>{if(this.refCount[e]>0)return;const t=this.refs.get(e);if(t.constructor[Symbol.metadata]!==void 0){const n=t.constructor[Symbol.metadata];for(const s in n){const r=n[s].name,a=t[r];if(typeof a=="object"&&a){const o=a[nt];o!==void 0&&!this.deletedRefs.has(o)&&this.removeRef(o)}}}else typeof t[ft]=="function"&&Array.from(t.values()).forEach(n=>{const s=n[nt];s!==void 0&&!this.deletedRefs.has(s)&&this.removeRef(s)});this.refs.delete(e),delete this.refCount[e],delete this.callbacks[e]}),this.deletedRefs.clear()}addCallback(e,t,n){if(e===void 0){const s=typeof t=="number"?_e[t]:t;throw new Error(`Can't addCallback on '${s}' (refId is undefined)`)}return this.callbacks[e]||(this.callbacks[e]={}),this.callbacks[e][t]||(this.callbacks[e][t]=[]),this.callbacks[e][t].push(n),()=>this.removeCallback(e,t,n)}removeCallback(e,t,n){const s=this.callbacks?.[e]?.[t]?.indexOf(n);s!==void 0&&s!==-1&&zx(this.callbacks[e][t],s)}}class Ca{context;state;root;currentRefId=0;triggerChanges;constructor(e,t){this.setState(e),this.context=t||new xn(e.constructor)}setState(e){this.state=e,this.root=new kx,this.root.addRef(0,e)}decode(e,t={offset:0},n=this.state){const s=[],r=this.root,a=e.byteLength;let o=n.constructor[Kn];for(this.currentRefId=0;t.offset<a;){if(e[t.offset]==Ta){t.offset++,n[bl]?.();const c=yt.number(e,t),h=r.refs.get(c);h?(n=h,o=n.constructor[Kn],this.currentRefId=c):(console.error(`"refId" not found: ${c}`,{previousRef:n,previousRefId:this.currentRefId}),console.warn("Please report this issue to the developers."),this.skipCurrentStructure(e,t,a));continue}if(o(this,e,t,n,s)===pu){console.warn("@colyseus/schema: definition mismatch"),this.skipCurrentStructure(e,t,a);continue}}return n[bl]?.(),this.triggerChanges?.(s),r.garbageCollectDeletedRefs(),s}skipCurrentStructure(e,t,n){const s={offset:t.offset};for(;t.offset<n&&!(e[t.offset]===Ta&&(s.offset=t.offset+1,this.root.refs.has(yt.number(e,s))));)t.offset++}getInstanceType(e,t,n){let s;if(e[t.offset]===Kf){t.offset++;const r=yt.number(e,t);s=this.context.get(r)}return s||n}createInstanceOfType(e){return new e}removeChildRefs(e,t){const n=typeof e[ft]!="string",s=e[nt];e.forEach((r,a)=>{t.push({ref:e,refId:s,op:_e.DELETE,field:a,value:void 0,previousValue:r}),n&&this.root.removeRef(r[nt])})}}const _u=Ua({name:"string",type:"string",referencedType:"number"}),xu=Ua({id:"number",extendsId:"number",fields:[_u]}),Ys=Ua({types:[xu],rootType:"number"});Ys.encode=function(i,e={offset:0}){const t=i.context,n=new Ys,s=new fr(n),r=t.schemas.get(i.state.constructor);r>0&&(n.rootType=r);const a=new Set,o={},l=h=>{if(h.extendsId===void 0||a.has(h.extendsId)){a.add(h.id),n.types.push(h);const u=o[h.id];u!==void 0&&(delete o[h.id],u.forEach(f=>l(f)))}else o[h.extendsId]===void 0&&(o[h.extendsId]=[]),o[h.extendsId].push(h)};t.schemas.forEach((h,u)=>{const f=new xu;f.id=Number(h);const d=Object.getPrototypeOf(u);d!==vt&&(f.extendsId=t.schemas.get(d));const g=u[Symbol.metadata];if(g!==d[Symbol.metadata])for(const v in g){const m=Number(v),p=g[m].name;if(!Object.prototype.hasOwnProperty.call(g,p))continue;const y=new _u;y.name=p;let w;const M=g[m];if(typeof M.type=="string")w=M.type;else{let D;vt.is(M.type)?(w="ref",D=M.type):(w=Object.keys(M.type)[0],typeof M.type[w]=="string"?w+=":"+M.type[w]:D=M.type[w]),y.referencedType=D?t.getTypeId(D):-1}y.type=w,f.fields.push(y)}l(f)});for(const h in o)o[h].forEach(u=>n.types.push(u));return s.encodeAll(e).slice(0,e.offset)};Ys.decode=function(i,e){const t=new Ys;new Ca(t).decode(i,e);const s=new xn;t.types.forEach(o=>{const l=s.get(o.extendsId)??vt,c=class extends l{};xn.register(c),s.add(c,o.id)},{});const r=(o,l,c)=>{l.fields.forEach((h,u)=>{const f=c+u;if(h.referencedType!==void 0){let d=h.type,g=s.get(h.referencedType);if(!g){const v=h.type.split(":");d=v[0],g=v[1]}d==="ref"?fn.addField(o,f,h.name,g):fn.addField(o,f,h.name,{[d]:g})}else fn.addField(o,f,h.name,h.type)})};t.types.forEach(o=>{const l=s.get(o.id),c=fn.initialize(l),h=[];let u=o;do h.push(u),u=t.types.find(d=>d.id===u.extendsId);while(u);let f=0;h.reverse().forEach(d=>{r(c,d,f),f+=d.fields.length})});const a=new(s.get(t.rootType||0));return new Ca(a,s)};Bi("map",{constructor:ln});Bi("array",{constructor:jt});Bi("set",{constructor:$s});Bi("collection",{constructor:Xs});var Al;try{Al=new TextDecoder}catch{}var pe,Jn,z=0,_t={},Ze,Ii,wn=0,Xn=0,Xt,gi,dn=[],je,zh={useRecords:!1,mapsAsObjects:!0};class vu{}const yu=new vu;yu.name="MessagePack 0xC1";var Ni=!1,Su=2,Vx;try{new Function("")}catch{Su=1/0}class xr{constructor(e){e&&(e.useRecords===!1&&e.mapsAsObjects===void 0&&(e.mapsAsObjects=!0),e.sequential&&e.trusted!==!1&&(e.trusted=!0,!e.structures&&e.useRecords!=!1&&(e.structures=[],e.maxSharedStructures||(e.maxSharedStructures=0))),e.structures?e.structures.sharedLength=e.structures.length:e.getStructures&&((e.structures=[]).uninitialized=!0,e.structures.sharedLength=0),e.int64AsNumber&&(e.int64AsType="number")),Object.assign(this,e)}unpack(e,t){if(pe)return Au(()=>(Rl(),this?this.unpack(e,t):xr.prototype.unpack.call(zh,e,t)));!e.buffer&&e.constructor===ArrayBuffer&&(e=typeof Buffer<"u"?Buffer.from(e):new Uint8Array(e)),typeof t=="object"?(Jn=t.end||e.length,z=t.start||0):(z=0,Jn=t>-1?t:e.length),Xn=0,Ii=null,Xt=null,pe=e;try{je=e.dataView||(e.dataView=new DataView(e.buffer,e.byteOffset,e.byteLength))}catch(n){throw pe=null,e instanceof Uint8Array?n:new Error("Source must be a Uint8Array or Buffer but was a "+(e&&typeof e=="object"?e.constructor.name:typeof e))}if(this instanceof xr){if(_t=this,this.structures)return Ze=this.structures,aa(t);(!Ze||Ze.length>0)&&(Ze=[])}else _t=zh,(!Ze||Ze.length>0)&&(Ze=[]);return aa(t)}unpackMultiple(e,t){let n,s=0;try{Ni=!0;let r=e.length,a=this?this.unpack(e,r):Na.unpack(e,r);if(t){if(t(a,s,z)===!1)return;for(;z<r;)if(s=z,t(aa(),s,z)===!1)return}else{for(n=[a];z<r;)s=z,n.push(aa());return n}}catch(r){throw r.lastPosition=s,r.values=n,r}finally{Ni=!1,Rl()}}_mergeStructures(e,t){e=e||[],Object.isFrozen(e)&&(e=e.map(n=>n.slice(0)));for(let n=0,s=e.length;n<s;n++){let r=e[n];r&&(r.isShared=!0,n>=32&&(r.highByte=n-32>>5))}e.sharedLength=e.length;for(let n in t||[])if(n>=0){let s=e[n],r=t[n];r&&(s&&((e.restoreStructures||(e.restoreStructures=[]))[n]=s),e[n]=r)}return this.structures=e}decode(e,t){return this.unpack(e,t)}}function aa(i){try{if(!_t.trusted&&!Ni){let t=Ze.sharedLength||0;t<Ze.length&&(Ze.length=t)}let e;if(_t.randomAccessStructure&&pe[z]<64&&pe[z]>=32&&Vx||(e=Dt()),Xt&&(z=Xt.postBundlePosition,Xt=null),Ni&&(Ze.restoreStructures=null),z==Jn)Ze&&Ze.restoreStructures&&kh(),Ze=null,pe=null,gi&&(gi=null);else{if(z>Jn)throw new Error("Unexpected end of MessagePack data");if(!Ni){let t;try{t=JSON.stringify(e,(n,s)=>typeof s=="bigint"?`${s}n`:s).slice(0,100)}catch(n){t="(JSON view not available "+n+")"}throw new Error("Data read, but end of buffer not reached "+t)}}return e}catch(e){throw Ze&&Ze.restoreStructures&&kh(),Rl(),(e instanceof RangeError||e.message.startsWith("Unexpected end of buffer")||z>Jn)&&(e.incomplete=!0),e}}function kh(){for(let i in Ze.restoreStructures)Ze[i]=Ze.restoreStructures[i];Ze.restoreStructures=null}function Dt(){let i=pe[z++];if(i<160)if(i<128){if(i<64)return i;{let e=Ze[i&63]||_t.getStructures&&Mu()[i&63];return e?(e.read||(e.read=fc(e,i&63)),e.read()):i}}else if(i<144)if(i-=128,_t.mapsAsObjects){let e={};for(let t=0;t<i;t++){let n=bu();n==="__proto__"&&(n="__proto_"),e[n]=Dt()}return e}else{let e=new Map;for(let t=0;t<i;t++)e.set(Dt(),Dt());return e}else{i-=144;let e=new Array(i);for(let t=0;t<i;t++)e[t]=Dt();return _t.freezeData?Object.freeze(e):e}else if(i<192){let e=i-160;if(Xn>=z)return Ii.slice(z-wn,(z+=e)-wn);if(Xn==0&&Jn<140){let t=e<16?uc(e):Eu(e);if(t!=null)return t}return Cl(e)}else{let e;switch(i){case 192:return null;case 193:return Xt?(e=Dt(),e>0?Xt[1].slice(Xt.position1,Xt.position1+=e):Xt[0].slice(Xt.position0,Xt.position0-=e)):yu;case 194:return!1;case 195:return!0;case 196:if(e=pe[z++],e===void 0)throw new Error("Unexpected end of buffer");return Eo(e);case 197:return e=je.getUint16(z),z+=2,Eo(e);case 198:return e=je.getUint32(z),z+=4,Eo(e);case 199:return qi(pe[z++]);case 200:return e=je.getUint16(z),z+=2,qi(e);case 201:return e=je.getUint32(z),z+=4,qi(e);case 202:if(e=je.getFloat32(z),_t.useFloat32>2){let t=dc[(pe[z]&127)<<1|pe[z+1]>>7];return z+=4,(t*e+(e>0?.5:-.5)>>0)/t}return z+=4,e;case 203:return e=je.getFloat64(z),z+=8,e;case 204:return pe[z++];case 205:return e=je.getUint16(z),z+=2,e;case 206:return e=je.getUint32(z),z+=4,e;case 207:return _t.int64AsType==="number"?(e=je.getUint32(z)*4294967296,e+=je.getUint32(z+4)):_t.int64AsType==="string"?e=je.getBigUint64(z).toString():_t.int64AsType==="auto"?(e=je.getBigUint64(z),e<=BigInt(2)<<BigInt(52)&&(e=Number(e))):e=je.getBigUint64(z),z+=8,e;case 208:return je.getInt8(z++);case 209:return e=je.getInt16(z),z+=2,e;case 210:return e=je.getInt32(z),z+=4,e;case 211:return _t.int64AsType==="number"?(e=je.getInt32(z)*4294967296,e+=je.getUint32(z+4)):_t.int64AsType==="string"?e=je.getBigInt64(z).toString():_t.int64AsType==="auto"?(e=je.getBigInt64(z),e>=BigInt(-2)<<BigInt(52)&&e<=BigInt(2)<<BigInt(52)&&(e=Number(e))):e=je.getBigInt64(z),z+=8,e;case 212:if(e=pe[z++],e==114)return $h(pe[z++]&63);{let t=dn[e];if(t)return t.read?(z++,t.read(Dt())):t.noBuffer?(z++,t()):t(pe.subarray(z,++z));throw new Error("Unknown extension "+e)}case 213:return e=pe[z],e==114?(z++,$h(pe[z++]&63,pe[z++])):qi(2);case 214:return qi(4);case 215:return qi(8);case 216:return qi(16);case 217:return e=pe[z++],Xn>=z?Ii.slice(z-wn,(z+=e)-wn):Hx(e);case 218:return e=je.getUint16(z),z+=2,Xn>=z?Ii.slice(z-wn,(z+=e)-wn):Wx(e);case 219:return e=je.getUint32(z),z+=4,Xn>=z?Ii.slice(z-wn,(z+=e)-wn):Xx(e);case 220:return e=je.getUint16(z),z+=2,Gh(e);case 221:return e=je.getUint32(z),z+=4,Gh(e);case 222:return e=je.getUint16(z),z+=2,Hh(e);case 223:return e=je.getUint32(z),z+=4,Hh(e);default:if(i>=224)return i-256;if(i===void 0){let t=new Error("Unexpected end of MessagePack data");throw t.incomplete=!0,t}throw new Error("Unknown MessagePack token "+i)}}}const Gx=/^[a-zA-Z_$][a-zA-Z\d_$]*$/;function fc(i,e){function t(){if(t.count++>Su){let s=i.read=new Function("r","return function(){return "+(_t.freezeData?"Object.freeze":"")+"({"+i.map(r=>r==="__proto__"?"__proto_:r()":Gx.test(r)?r+":r()":"["+JSON.stringify(r)+"]:r()").join(",")+"})}")(Dt);return i.highByte===0&&(i.read=Vh(e,i.read)),s()}let n={};for(let s=0,r=i.length;s<r;s++){let a=i[s];a==="__proto__"&&(a="__proto_"),n[a]=Dt()}return _t.freezeData?Object.freeze(n):n}return t.count=0,i.highByte===0?Vh(e,t):t}const Vh=(i,e)=>function(){let t=pe[z++];if(t===0)return e();let n=i<32?-(i+(t<<5)):i+(t<<5),s=Ze[n]||Mu()[n];if(!s)throw new Error("Record id is not defined for "+n);return s.read||(s.read=fc(s,i)),s.read()};function Mu(){let i=Au(()=>(pe=null,_t.getStructures()));return Ze=_t._mergeStructures(i,Ze)}var Cl=wr,Hx=wr,Wx=wr,Xx=wr;function wr(i){let e;if(i<16&&(e=uc(i)))return e;if(i>64&&Al)return Al.decode(pe.subarray(z,z+=i));const t=z+i,n=[];for(e="";z<t;){const s=pe[z++];if((s&128)===0)n.push(s);else if((s&224)===192){const r=pe[z++]&63;n.push((s&31)<<6|r)}else if((s&240)===224){const r=pe[z++]&63,a=pe[z++]&63;n.push((s&31)<<12|r<<6|a)}else if((s&248)===240){const r=pe[z++]&63,a=pe[z++]&63,o=pe[z++]&63;let l=(s&7)<<18|r<<12|a<<6|o;l>65535&&(l-=65536,n.push(l>>>10&1023|55296),l=56320|l&1023),n.push(l)}else n.push(s);n.length>=4096&&(e+=Ht.apply(String,n),n.length=0)}return n.length>0&&(e+=Ht.apply(String,n)),e}function Gh(i){let e=new Array(i);for(let t=0;t<i;t++)e[t]=Dt();return _t.freezeData?Object.freeze(e):e}function Hh(i){if(_t.mapsAsObjects){let e={};for(let t=0;t<i;t++){let n=bu();n==="__proto__"&&(n="__proto_"),e[n]=Dt()}return e}else{let e=new Map;for(let t=0;t<i;t++)e.set(Dt(),Dt());return e}}var Ht=String.fromCharCode;function Eu(i){let e=z,t=new Array(i);for(let n=0;n<i;n++){const s=pe[z++];if((s&128)>0){z=e;return}t[n]=s}return Ht.apply(String,t)}function uc(i){if(i<4)if(i<2){if(i===0)return"";{let e=pe[z++];if((e&128)>1){z-=1;return}return Ht(e)}}else{let e=pe[z++],t=pe[z++];if((e&128)>0||(t&128)>0){z-=2;return}if(i<3)return Ht(e,t);let n=pe[z++];if((n&128)>0){z-=3;return}return Ht(e,t,n)}else{let e=pe[z++],t=pe[z++],n=pe[z++],s=pe[z++];if((e&128)>0||(t&128)>0||(n&128)>0||(s&128)>0){z-=4;return}if(i<6){if(i===4)return Ht(e,t,n,s);{let r=pe[z++];if((r&128)>0){z-=5;return}return Ht(e,t,n,s,r)}}else if(i<8){let r=pe[z++],a=pe[z++];if((r&128)>0||(a&128)>0){z-=6;return}if(i<7)return Ht(e,t,n,s,r,a);let o=pe[z++];if((o&128)>0){z-=7;return}return Ht(e,t,n,s,r,a,o)}else{let r=pe[z++],a=pe[z++],o=pe[z++],l=pe[z++];if((r&128)>0||(a&128)>0||(o&128)>0||(l&128)>0){z-=8;return}if(i<10){if(i===8)return Ht(e,t,n,s,r,a,o,l);{let c=pe[z++];if((c&128)>0){z-=9;return}return Ht(e,t,n,s,r,a,o,l,c)}}else if(i<12){let c=pe[z++],h=pe[z++];if((c&128)>0||(h&128)>0){z-=10;return}if(i<11)return Ht(e,t,n,s,r,a,o,l,c,h);let u=pe[z++];if((u&128)>0){z-=11;return}return Ht(e,t,n,s,r,a,o,l,c,h,u)}else{let c=pe[z++],h=pe[z++],u=pe[z++],f=pe[z++];if((c&128)>0||(h&128)>0||(u&128)>0||(f&128)>0){z-=12;return}if(i<14){if(i===12)return Ht(e,t,n,s,r,a,o,l,c,h,u,f);{let d=pe[z++];if((d&128)>0){z-=13;return}return Ht(e,t,n,s,r,a,o,l,c,h,u,f,d)}}else{let d=pe[z++],g=pe[z++];if((d&128)>0||(g&128)>0){z-=14;return}if(i<15)return Ht(e,t,n,s,r,a,o,l,c,h,u,f,d,g);let v=pe[z++];if((v&128)>0){z-=15;return}return Ht(e,t,n,s,r,a,o,l,c,h,u,f,d,g,v)}}}}}function Wh(){let i=pe[z++],e;if(i<192)e=i-160;else switch(i){case 217:e=pe[z++];break;case 218:e=je.getUint16(z),z+=2;break;case 219:e=je.getUint32(z),z+=4;break;default:throw new Error("Expected string")}return wr(e)}function Eo(i){return _t.copyBuffers?Uint8Array.prototype.slice.call(pe,z,z+=i):pe.subarray(z,z+=i)}function qi(i){let e=pe[z++];if(dn[e]){let t;return dn[e](pe.subarray(z,t=z+=i),n=>{z=n;try{return Dt()}finally{z=t}})}else throw new Error("Unknown extension type "+e)}var Xh=new Array(4096);function bu(){let i=pe[z++];if(i>=160&&i<192){if(i=i-160,Xn>=z)return Ii.slice(z-wn,(z+=i)-wn);if(!(Xn==0&&Jn<180))return Cl(i)}else return z--,wu(Dt());let e=(i<<5^(i>1?je.getUint16(z):i>0?pe[z]:0))&4095,t=Xh[e],n=z,s=z+i-3,r,a=0;if(t&&t.bytes==i){for(;n<s;){if(r=je.getUint32(n),r!=t[a++]){n=1879048192;break}n+=4}for(s+=3;n<s;)if(r=pe[n++],r!=t[a++]){n=1879048192;break}if(n===s)return z=n,t.string;s-=3,n=z}for(t=[],Xh[e]=t,t.bytes=i;n<s;)r=je.getUint32(n),t.push(r),n+=4;for(s+=3;n<s;)r=pe[n++],t.push(r);let o=i<16?uc(i):Eu(i);return o!=null?t.string=o:t.string=Cl(i)}function wu(i){if(typeof i=="string")return i;if(typeof i=="number"||typeof i=="boolean"||typeof i=="bigint")return i.toString();if(i==null)return i+"";if(_t.allowArraysInMapKeys&&Array.isArray(i)&&i.flat().every(e=>["string","number","boolean","bigint"].includes(typeof e)))return i.flat().toString();throw new Error(`Invalid property type for record: ${typeof i}`)}const $h=(i,e)=>{let t=Dt().map(wu),n=i;e!==void 0&&(i=i<32?-((e<<5)+i):(e<<5)+i,t.highByte=e);let s=Ze[i];return s&&(s.isShared||Ni)&&((Ze.restoreStructures||(Ze.restoreStructures=[]))[i]=s),Ze[i]=t,t.read=fc(t,n),t.read()};dn[0]=()=>{};dn[0].noBuffer=!0;dn[66]=i=>{let e=i.length,t=BigInt(i[0]&128?i[0]-256:i[0]);for(let n=1;n<e;n++)t<<=BigInt(8),t+=BigInt(i[n]);return t};let $x={Error,TypeError,ReferenceError};dn[101]=()=>{let i=Dt();return($x[i[0]]||Error)(i[1],{cause:i[2]})};dn[105]=i=>{if(_t.structuredClone===!1)throw new Error("Structured clone extension is disabled");let e=je.getUint32(z-4);gi||(gi=new Map);let t=pe[z],n;t>=144&&t<160||t==220||t==221?n=[]:n={};let s={target:n};gi.set(e,s);let r=Dt();return s.used?Object.assign(n,r):(s.target=r,r)};dn[112]=i=>{if(_t.structuredClone===!1)throw new Error("Structured clone extension is disabled");let e=je.getUint32(z-4),t=gi.get(e);return t.used=!0,t.target};dn[115]=()=>new Set(Dt());const Tu=["Int8","Uint8","Uint8Clamped","Int16","Uint16","Int32","Uint32","Float32","Float64","BigInt64","BigUint64"].map(i=>i+"Array");let Yx=typeof globalThis=="object"?globalThis:window;dn[116]=i=>{let e=i[0],t=Tu[e];if(!t){if(e===16){let n=new ArrayBuffer(i.length-1);return new Uint8Array(n).set(i.subarray(1)),n}throw new Error("Could not find typed array for code "+e)}return new Yx[t](Uint8Array.prototype.slice.call(i,1).buffer)};dn[120]=()=>{let i=Dt();return new RegExp(i[0],i[1])};const qx=[];dn[98]=i=>{let e=(i[0]<<24)+(i[1]<<16)+(i[2]<<8)+i[3],t=z;return z+=e-i.length,Xt=qx,Xt=[Wh(),Wh()],Xt.position0=0,Xt.position1=0,Xt.postBundlePosition=z,z=t,Dt()};dn[255]=i=>i.length==4?new Date((i[0]*16777216+(i[1]<<16)+(i[2]<<8)+i[3])*1e3):i.length==8?new Date(((i[0]<<22)+(i[1]<<14)+(i[2]<<6)+(i[3]>>2))/1e6+((i[3]&3)*4294967296+i[4]*16777216+(i[5]<<16)+(i[6]<<8)+i[7])*1e3):i.length==12?new Date(((i[0]<<24)+(i[1]<<16)+(i[2]<<8)+i[3])/1e6+((i[4]&128?-281474976710656:0)+i[6]*1099511627776+i[7]*4294967296+i[8]*16777216+(i[9]<<16)+(i[10]<<8)+i[11])*1e3):new Date("invalid");function Au(i){let e=Jn,t=z,n=wn,s=Xn,r=Ii,a=gi,o=Xt,l=new Uint8Array(pe.slice(0,Jn)),c=Ze,h=Ze.slice(0,Ze.length),u=_t,f=Ni,d=i();return Jn=e,z=t,wn=n,Xn=s,Ii=r,gi=a,Xt=o,pe=l,Ni=f,Ze=c,Ze.splice(0,Ze.length,...h),_t=u,je=new DataView(pe.buffer,pe.byteOffset,pe.byteLength),d}function Rl(){pe=null,gi=null,Ze=null}const dc=new Array(147);for(let i=0;i<256;i++)dc[i]=+("1e"+Math.floor(45.15-i*.30103));var Na=new xr({useRecords:!1});const jx=Na.unpack;Na.unpackMultiple;Na.unpack;let Zx=new Float32Array(1);new Uint8Array(Zx.buffer,0,4);let ma;try{ma=new TextEncoder}catch{}let Pl,Cu;const Fa=typeof Buffer<"u",oa=Fa?function(i){return Buffer.allocUnsafeSlow(i)}:Uint8Array,Ru=Fa?Buffer:Uint8Array,Yh=Fa?4294967296:2144337920;let H,ar,gt,k=0,rn,St=null,Kx;const Jx=21760,Qx=/[\u0080-\uFFFF]/,Rs=Symbol("record-id");class Pu extends xr{constructor(e){super(e),this.offset=0;let t,n,s,r,a=Ru.prototype.utf8Write?function(b,U){return H.utf8Write(b,U,H.byteLength-U)}:ma&&ma.encodeInto?function(b,U){return ma.encodeInto(b,H.subarray(U)).written}:!1,o=this;e||(e={});let l=e&&e.sequential,c=e.structures||e.saveStructures,h=e.maxSharedStructures;if(h==null&&(h=c?32:0),h>8160)throw new Error("Maximum maxSharedStructure is 8160");e.structuredClone&&e.moreTypes==null&&(this.moreTypes=!0);let u=e.maxOwnStructures;u==null&&(u=c?32:64),!this.structures&&e.useRecords!=!1&&(this.structures=[]);let f=h>32||u+h>64,d=h+64,g=h+u+64;if(g>8256)throw new Error("Maximum maxSharedStructure + maxOwnStructure is 8192");let v=[],m=0,p=0;this.pack=this.encode=function(b,U){if(H||(H=new oa(8192),gt=H.dataView||(H.dataView=new DataView(H.buffer,0,8192)),k=0),rn=H.length-10,rn-k<2048?(H=new oa(H.length),gt=H.dataView||(H.dataView=new DataView(H.buffer,0,H.length)),rn=H.length-10,k=0):k=k+7&2147483640,t=k,U&rv&&(k+=U&255),r=o.structuredClone?new Map:null,o.bundleStrings&&typeof b!="string"?(St=[],St.size=1/0):St=null,s=o.structures,s){s.uninitialized&&(s=o._mergeStructures(o.getStructures()));let P=s.sharedLength||0;if(P>h)throw new Error("Shared structures is larger than maximum shared structures, try increasing maxSharedStructures to "+s.sharedLength);if(!s.transitions){s.transitions=Object.create(null);for(let A=0;A<P;A++){let q=s[A];if(!q)continue;let j,ee=s.transitions;for(let se=0,ie=q.length;se<ie;se++){let Pe=q[se];j=ee[Pe],j||(j=ee[Pe]=Object.create(null)),ee=j}ee[Rs]=A+64}this.lastNamedStructuresLength=P}l||(s.nextId=P+64)}n&&(n=!1);let C;try{o.randomAccessStructure&&b&&b.constructor&&b.constructor===Object?G(b):M(b);let P=St;if(St&&Zh(t,M,0),r&&r.idsToInsert){let A=r.idsToInsert.sort((se,ie)=>se.offset>ie.offset?1:-1),q=A.length,j=-1;for(;P&&q>0;){let se=A[--q].offset+t;se<P.stringsPosition+t&&j===-1&&(j=0),se>P.position+t?j>=0&&(j+=6):(j>=0&&(gt.setUint32(P.position+t,gt.getUint32(P.position+t)+j),j=-1),P=P.previous,q++)}j>=0&&P&&gt.setUint32(P.position+t,gt.getUint32(P.position+t)+j),k+=A.length*6,k>rn&&E(k),o.offset=k;let ee=tv(H.subarray(t,k),A);return r=null,ee}return o.offset=k,U&iv?(H.start=t,H.end=k,H):H.subarray(t,k)}catch(P){throw C=P,P}finally{if(s&&(y(),n&&o.saveStructures)){let P=s.sharedLength||0,A=H.subarray(t,k),q=nv(s,o);if(!C)return o.saveStructures(q,q.isCompatible)===!1?o.pack(b,U):(o.lastNamedStructuresLength=P,H.length>1073741824&&(H=null),A)}H.length>1073741824&&(H=null),U&sv&&(k=t)}};const y=()=>{p<10&&p++;let b=s.sharedLength||0;if(s.length>b&&!l&&(s.length=b),m>1e4)s.transitions=null,p=0,m=0,v.length>0&&(v=[]);else if(v.length>0&&!l){for(let U=0,C=v.length;U<C;U++)v[U][Rs]=0;v=[]}},w=b=>{var U=b.length;U<16?H[k++]=144|U:U<65536?(H[k++]=220,H[k++]=U>>8,H[k++]=U&255):(H[k++]=221,gt.setUint32(k,U),k+=4);for(let C=0;C<U;C++)M(b[C])},M=b=>{k>rn&&(H=E(k));var U=typeof b,C;if(U==="string"){let P=b.length;if(St&&P>=4&&P<4096){if((St.size+=P)>Jx){let ee,se=(St[0]?St[0].length*3+St[1].length:0)+10;k+se>rn&&(H=E(k+se));let ie;St.position?(ie=St,H[k]=200,k+=3,H[k++]=98,ee=k-t,k+=4,Zh(t,M,0),gt.setUint16(ee+t-3,k-t-ee)):(H[k++]=214,H[k++]=98,ee=k-t,k+=4),St=["",""],St.previous=ie,St.size=0,St.position=ee}let j=Qx.test(b);St[j?0:1]+=b,H[k++]=193,M(j?-P:P);return}let A;P<32?A=1:P<256?A=2:P<65536?A=3:A=5;let q=P*3;if(k+q>rn&&(H=E(k+q)),P<64||!a){let j,ee,se,ie=k+A;for(j=0;j<P;j++)ee=b.charCodeAt(j),ee<128?H[ie++]=ee:ee<2048?(H[ie++]=ee>>6|192,H[ie++]=ee&63|128):(ee&64512)===55296&&((se=b.charCodeAt(j+1))&64512)===56320?(ee=65536+((ee&1023)<<10)+(se&1023),j++,H[ie++]=ee>>18|240,H[ie++]=ee>>12&63|128,H[ie++]=ee>>6&63|128,H[ie++]=ee&63|128):(H[ie++]=ee>>12|224,H[ie++]=ee>>6&63|128,H[ie++]=ee&63|128);C=ie-k-A}else C=a(b,k+A);C<32?H[k++]=160|C:C<256?(A<2&&H.copyWithin(k+2,k+1,k+1+C),H[k++]=217,H[k++]=C):C<65536?(A<3&&H.copyWithin(k+3,k+2,k+2+C),H[k++]=218,H[k++]=C>>8,H[k++]=C&255):(A<5&&H.copyWithin(k+5,k+3,k+3+C),H[k++]=219,gt.setUint32(k,C),k+=4),k+=C}else if(U==="number")if(b>>>0===b)b<32||b<128&&this.useRecords===!1||b<64&&!this.randomAccessStructure?H[k++]=b:b<256?(H[k++]=204,H[k++]=b):b<65536?(H[k++]=205,H[k++]=b>>8,H[k++]=b&255):(H[k++]=206,gt.setUint32(k,b),k+=4);else if(b>>0===b)b>=-32?H[k++]=256+b:b>=-128?(H[k++]=208,H[k++]=b+256):b>=-32768?(H[k++]=209,gt.setInt16(k,b),k+=2):(H[k++]=210,gt.setInt32(k,b),k+=4);else{let P;if((P=this.useFloat32)>0&&b<4294967296&&b>=-2147483648){H[k++]=202,gt.setFloat32(k,b);let A;if(P<4||(A=b*dc[(H[k]&127)<<1|H[k+1]>>7])>>0===A){k+=4;return}else k--}H[k++]=203,gt.setFloat64(k,b),k+=8}else if(U==="object"||U==="function")if(!b)H[k++]=192;else{if(r){let A=r.get(b);if(A){if(!A.id){let q=r.idsToInsert||(r.idsToInsert=[]);A.id=q.push(A)}H[k++]=214,H[k++]=112,gt.setUint32(k,A.id),k+=4;return}else r.set(b,{offset:k-t})}let P=b.constructor;if(P===Object)x(b);else if(P===Array)w(b);else if(P===Map)if(this.mapAsEmptyObject)H[k++]=128;else{C=b.size,C<16?H[k++]=128|C:C<65536?(H[k++]=222,H[k++]=C>>8,H[k++]=C&255):(H[k++]=223,gt.setUint32(k,C),k+=4);for(let[A,q]of b)M(A),M(q)}else{for(let A=0,q=Pl.length;A<q;A++){let j=Cu[A];if(b instanceof j){let ee=Pl[A];if(ee.write){ee.type&&(H[k++]=212,H[k++]=ee.type,H[k++]=0);let Ke=ee.write.call(this,b);Ke===b?Array.isArray(b)?w(b):x(b):M(Ke);return}let se=H,ie=gt,Pe=k;H=null;let qe;try{qe=ee.pack.call(this,b,Ke=>(H=se,se=null,k+=Ke,k>rn&&E(k),{target:H,targetView:gt,position:k-Ke}),M)}finally{se&&(H=se,gt=ie,k=Pe,rn=H.length-10)}qe&&(qe.length+k>rn&&E(qe.length+k),k=ev(qe,H,k,ee.type));return}}if(Array.isArray(b))w(b);else{if(b.toJSON){const A=b.toJSON();if(A!==b)return M(A)}if(U==="function")return M(this.writeFunction&&this.writeFunction(b));x(b)}}}else if(U==="boolean")H[k++]=b?195:194;else if(U==="bigint"){if(b<BigInt(1)<<BigInt(63)&&b>=-(BigInt(1)<<BigInt(63)))H[k++]=211,gt.setBigInt64(k,b);else if(b<BigInt(1)<<BigInt(64)&&b>0)H[k++]=207,gt.setBigUint64(k,b);else if(this.largeBigIntToFloat)H[k++]=203,gt.setFloat64(k,Number(b));else{if(this.largeBigIntToString)return M(b.toString());if(this.useBigIntExtension&&b<BigInt(2)**BigInt(1023)&&b>-(BigInt(2)**BigInt(1023))){H[k++]=199,k++,H[k++]=66;let P=[],A;do{let q=b&BigInt(255);A=(q&BigInt(128))===(b<BigInt(0)?BigInt(128):BigInt(0)),P.push(q),b>>=BigInt(8)}while(!((b===BigInt(0)||b===BigInt(-1))&&A));H[k-2]=P.length;for(let q=P.length;q>0;)H[k++]=Number(P[--q]);return}else throw new RangeError(b+" was too large to fit in MessagePack 64-bit integer format, use useBigIntExtension, or set largeBigIntToFloat to convert to float-64, or set largeBigIntToString to convert to string")}k+=8}else if(U==="undefined")this.encodeUndefinedAsNil?H[k++]=192:(H[k++]=212,H[k++]=0,H[k++]=0);else throw new Error("Unknown type: "+U)},D=this.variableMapSize||this.coercibleKeyAsNumber||this.skipValues?b=>{let U;if(this.skipValues){U=[];for(let A in b)(typeof b.hasOwnProperty!="function"||b.hasOwnProperty(A))&&!this.skipValues.includes(b[A])&&U.push(A)}else U=Object.keys(b);let C=U.length;C<16?H[k++]=128|C:C<65536?(H[k++]=222,H[k++]=C>>8,H[k++]=C&255):(H[k++]=223,gt.setUint32(k,C),k+=4);let P;if(this.coercibleKeyAsNumber)for(let A=0;A<C;A++){P=U[A];let q=Number(P);M(isNaN(q)?P:q),M(b[P])}else for(let A=0;A<C;A++)M(P=U[A]),M(b[P])}:b=>{H[k++]=222;let U=k-t;k+=2;let C=0;for(let P in b)(typeof b.hasOwnProperty!="function"||b.hasOwnProperty(P))&&(M(P),M(b[P]),C++);if(C>65535)throw new Error('Object is too large to serialize with fast 16-bit map size, use the "variableMapSize" option to serialize this object');H[U+++t]=C>>8,H[U+t]=C&255},R=this.useRecords===!1?D:e.progressiveRecords&&!f?b=>{let U,C=s.transitions||(s.transitions=Object.create(null)),P=k++-t,A;for(let q in b)if(typeof b.hasOwnProperty!="function"||b.hasOwnProperty(q)){if(U=C[q],U)C=U;else{let j=Object.keys(b),ee=C;C=s.transitions;let se=0;for(let ie=0,Pe=j.length;ie<Pe;ie++){let qe=j[ie];U=C[qe],U||(U=C[qe]=Object.create(null),se++),C=U}P+t+1==k?(k--,X(C,j,se)):I(C,j,P,se),A=!0,C=ee[q]}M(b[q])}if(!A){let q=C[Rs];q?H[P+t]=q:I(C,Object.keys(b),P,0)}}:b=>{let U,C=s.transitions||(s.transitions=Object.create(null)),P=0;for(let q in b)(typeof b.hasOwnProperty!="function"||b.hasOwnProperty(q))&&(U=C[q],U||(U=C[q]=Object.create(null),P++),C=U);let A=C[Rs];A?A>=96&&f?(H[k++]=((A-=96)&31)+96,H[k++]=A>>5):H[k++]=A:X(C,C.__keys__||Object.keys(b),P);for(let q in b)(typeof b.hasOwnProperty!="function"||b.hasOwnProperty(q))&&M(b[q])},L=typeof this.useRecords=="function"&&this.useRecords,x=L?b=>{L(b)?R(b):D(b)}:R,E=b=>{let U;if(b>16777216){if(b-t>Yh)throw new Error("Packed buffer would be larger than maximum buffer size");U=Math.min(Yh,Math.round(Math.max((b-t)*(b>67108864?1.25:2),4194304)/4096)*4096)}else U=(Math.max(b-t<<2,H.length-1)>>12)+1<<12;let C=new oa(U);return gt=C.dataView||(C.dataView=new DataView(C.buffer,0,U)),b=Math.min(b,H.length),H.copy?H.copy(C,0,t,b):C.set(H.slice(t,b)),k-=t,t=0,rn=C.length-10,H=C},X=(b,U,C)=>{let P=s.nextId;P||(P=64),P<d&&this.shouldShareStructure&&!this.shouldShareStructure(U)?(P=s.nextOwnId,P<g||(P=d),s.nextOwnId=P+1):(P>=g&&(P=d),s.nextId=P+1);let A=U.highByte=P>=96&&f?P-96>>5:-1;b[Rs]=P,b.__keys__=U,s[P-64]=U,P<d?(U.isShared=!0,s.sharedLength=P-63,n=!0,A>=0?(H[k++]=(P&31)+96,H[k++]=A):H[k++]=P):(A>=0?(H[k++]=213,H[k++]=114,H[k++]=(P&31)+96,H[k++]=A):(H[k++]=212,H[k++]=114,H[k++]=P),C&&(m+=p*C),v.length>=u&&(v.shift()[Rs]=0),v.push(b),M(U))},I=(b,U,C,P)=>{let A=H,q=k,j=rn,ee=t;H=ar,k=0,t=0,H||(ar=H=new oa(8192)),rn=H.length-10,X(b,U,P),ar=H;let se=k;if(H=A,k=q,rn=j,t=ee,se>1){let ie=k+se-1;ie>rn&&E(ie);let Pe=C+t;H.copyWithin(Pe+se,Pe+1,k),H.set(ar.slice(0,se),Pe),k=ie}else H[C+t]=ar[0]},G=b=>{let U=Kx(b,H,t,k,s,E,(C,P,A)=>{if(A)return n=!0;k=P;let q=H;return M(C),y(),q!==H?{position:k,targetView:gt,target:H}:k},this);if(U===0)return x(b);k=U}}useBuffer(e){H=e,H.dataView||(H.dataView=new DataView(H.buffer,H.byteOffset,H.byteLength)),k=0}set position(e){k=e}get position(){return k}set buffer(e){H=e}get buffer(){return H}clearSharedData(){this.structures&&(this.structures=[]),this.typedStructs&&(this.typedStructs=[])}}Cu=[Date,Set,Error,RegExp,ArrayBuffer,Object.getPrototypeOf(Uint8Array.prototype).constructor,vu];Pl=[{pack(i,e,t){let n=i.getTime()/1e3;if((this.useTimestamp32||i.getMilliseconds()===0)&&n>=0&&n<4294967296){let{target:s,targetView:r,position:a}=e(6);s[a++]=214,s[a++]=255,r.setUint32(a,n)}else if(n>0&&n<4294967296){let{target:s,targetView:r,position:a}=e(10);s[a++]=215,s[a++]=255,r.setUint32(a,i.getMilliseconds()*4e6+(n/1e3/4294967296>>0)),r.setUint32(a+4,n)}else if(isNaN(n)){if(this.onInvalidDate)return e(0),t(this.onInvalidDate());let{target:s,targetView:r,position:a}=e(3);s[a++]=212,s[a++]=255,s[a++]=255}else{let{target:s,targetView:r,position:a}=e(15);s[a++]=199,s[a++]=12,s[a++]=255,r.setUint32(a,i.getMilliseconds()*1e6),r.setBigInt64(a+4,BigInt(Math.floor(n)))}}},{pack(i,e,t){if(this.setAsEmptyObject)return e(0),t({});let n=Array.from(i),{target:s,position:r}=e(this.moreTypes?3:0);this.moreTypes&&(s[r++]=212,s[r++]=115,s[r++]=0),t(n)}},{pack(i,e,t){let{target:n,position:s}=e(this.moreTypes?3:0);this.moreTypes&&(n[s++]=212,n[s++]=101,n[s++]=0),t([i.name,i.message,i.cause])}},{pack(i,e,t){let{target:n,position:s}=e(this.moreTypes?3:0);this.moreTypes&&(n[s++]=212,n[s++]=120,n[s++]=0),t([i.source,i.flags])}},{pack(i,e){this.moreTypes?qh(i,16,e):jh(Fa?Buffer.from(i):new Uint8Array(i),e)}},{pack(i,e){let t=i.constructor;t!==Ru&&this.moreTypes?qh(i,Tu.indexOf(t.name),e):jh(i,e)}},{pack(i,e){let{target:t,position:n}=e(1);t[n]=193}}];function qh(i,e,t,n){let s=i.byteLength;if(s+1<256){var{target:r,position:a}=t(4+s);r[a++]=199,r[a++]=s+1}else if(s+1<65536){var{target:r,position:a}=t(5+s);r[a++]=200,r[a++]=s+1>>8,r[a++]=s+1&255}else{var{target:r,position:a,targetView:o}=t(7+s);r[a++]=201,o.setUint32(a,s+1),a+=4}r[a++]=116,r[a++]=e,i.buffer||(i=new Uint8Array(i)),r.set(new Uint8Array(i.buffer,i.byteOffset,i.byteLength),a)}function jh(i,e){let t=i.byteLength;var n,s;if(t<256){var{target:n,position:s}=e(t+2);n[s++]=196,n[s++]=t}else if(t<65536){var{target:n,position:s}=e(t+3);n[s++]=197,n[s++]=t>>8,n[s++]=t&255}else{var{target:n,position:s,targetView:r}=e(t+5);n[s++]=198,r.setUint32(s,t),s+=4}n.set(i,s)}function ev(i,e,t,n){let s=i.length;switch(s){case 1:e[t++]=212;break;case 2:e[t++]=213;break;case 4:e[t++]=214;break;case 8:e[t++]=215;break;case 16:e[t++]=216;break;default:s<256?(e[t++]=199,e[t++]=s):s<65536?(e[t++]=200,e[t++]=s>>8,e[t++]=s&255):(e[t++]=201,e[t++]=s>>24,e[t++]=s>>16&255,e[t++]=s>>8&255,e[t++]=s&255)}return e[t++]=n,e.set(i,t),t+=s,t}function tv(i,e){let t,n=e.length*6,s=i.length-n;for(;t=e.pop();){let r=t.offset,a=t.id;i.copyWithin(r+n,r,s),n-=6;let o=r+n;i[o++]=214,i[o++]=105,i[o++]=a>>24,i[o++]=a>>16&255,i[o++]=a>>8&255,i[o++]=a&255,s=r}return i}function Zh(i,e,t){if(St.length>0){gt.setUint32(St.position+i,k+t-St.position-i),St.stringsPosition=k-i;let n=St;St=null,e(n[0]),e(n[1])}}function nv(i,e){return i.isCompatible=t=>{let n=!t||(e.lastNamedStructuresLength||0)===t.length;return n||e._mergeStructures(t),n},i}let Du=new Pu({useRecords:!1});Du.pack;Du.pack;const iv=512,sv=1024,rv=2048;class av{wt;isOpen=!1;events;reader;writer;unreliableReader;unreliableWriter;lengthPrefixBuffer=new Uint8Array(9);constructor(e){this.events=e}connect(e,t={}){const n=t.fingerprint&&{serverCertificateHashes:[{algorithm:"sha-256",value:new Uint8Array(t.fingerprint).buffer}]}||void 0;this.wt=new WebTransport(e,n),this.wt.ready.then(s=>{console.log("WebTransport ready!",s),this.isOpen=!0,this.unreliableReader=this.wt.datagrams.readable.getReader(),this.unreliableWriter=this.wt.datagrams.writable.getWriter(),this.wt.incomingBidirectionalStreams.getReader().read().then(a=>{this.reader=a.value.readable.getReader(),this.writer=a.value.writable.getWriter(),this.sendSeatReservation(t.roomId,t.sessionId,t.reconnectionToken,t.skipHandshake),this.readIncomingData(),this.readIncomingUnreliableData()}).catch(a=>{console.error("failed to read incoming stream",a),console.error("TODO: close the connection")})}).catch(s=>{console.log("WebTransport not ready!",s),this._close()}),this.wt.closed.then(s=>{console.log("WebTransport closed w/ success",s),this.events.onclose({code:s.closeCode,reason:s.reason})}).catch(s=>{console.log("WebTransport closed w/ error",s),this.events.onerror(s),this.events.onclose({code:s.closeCode,reason:s.reason})}).finally(()=>{this._close()})}send(e){const t=wt.number(this.lengthPrefixBuffer,e.length,{offset:0}),n=new Uint8Array(t+e.length);n.set(this.lengthPrefixBuffer.subarray(0,t),0),n.set(e,t),this.writer.write(n)}sendUnreliable(e){const t=wt.number(this.lengthPrefixBuffer,e.length,{offset:0}),n=new Uint8Array(t+e.length);n.set(this.lengthPrefixBuffer.subarray(0,t),0),n.set(e,t),this.unreliableWriter.write(n)}close(e,t){try{this.wt.close({closeCode:e,reason:t})}catch(n){console.error(n)}}async readIncomingData(){let e;for(;this.isOpen;){try{e=await this.reader.read();const t=e.value,n={offset:0};do{const s=yt.number(t,n);this.events.onmessage({data:t.subarray(n.offset,n.offset+s)}),n.offset+=s}while(n.offset<t.length)}catch(t){t.message.indexOf("session is closed")===-1&&console.error("H3Transport: failed to read incoming data",t);break}if(e.done)break}}async readIncomingUnreliableData(){let e;for(;this.isOpen;){try{e=await this.unreliableReader.read();const t=e.value,n={offset:0};do{const s=yt.number(t,n);this.events.onmessage({data:t.subarray(n.offset,n.offset+s)}),n.offset+=s}while(n.offset<t.length)}catch(t){t.message.indexOf("session is closed")===-1&&console.error("H3Transport: failed to read incoming data",t);break}if(e.done)break}}sendSeatReservation(e,t,n,s){const r={offset:0},a=[];wt.string(a,e,r),wt.string(a,t,r),n&&wt.string(a,n,r),s&&wt.boolean(a,1,r),this.writer.write(new Uint8Array(a).buffer)}_close(){this.isOpen=!1}}function ov(i){return i&&i.__esModule&&Object.prototype.hasOwnProperty.call(i,"default")?i.default:i}var bo,Kh;function lv(){return Kh||(Kh=1,bo=function(){throw new Error("ws does not work in the browser. Browser clients must use the native WebSocket object")}),bo}var cv=lv();const hv=ov(cv),wo=globalThis.WebSocket||hv;class fv{ws;protocols;events;constructor(e){this.events=e}send(e){this.ws.send(e)}sendUnreliable(e){console.warn("@colyseus/sdk: The WebSocket transport does not support unreliable messages")}connect(e,t){try{this.ws=new wo(e,{headers:t,protocols:this.protocols})}catch{this.ws=new wo(e,this.protocols)}this.ws.binaryType="arraybuffer",this.ws.onopen=n=>this.events.onopen?.(n),this.ws.onmessage=n=>this.events.onmessage?.(n),this.ws.onclose=n=>this.events.onclose?.(n),this.ws.onerror=n=>this.events.onerror?.(n)}close(e,t){e===Vn.MAY_TRY_RECONNECT&&this.events.onclose&&(this.ws.onclose=null,this.events.onclose({code:e,reason:t})),this.ws.close(e,t)}get isOpen(){return this.ws.readyState===wo.OPEN}}const ur=[],Dl=typeof addEventListener=="function"&&typeof removeEventListener=="function";Dl&&addEventListener("offline",()=>{console.warn(`@colyseus/sdk: 🛑 Network offline. Closing ${ur.length} connection(s)`),ur.forEach(i=>i())},!1);class Iu{transport;events={};url;options;#t=Dl?()=>this.close(Vn.MAY_TRY_RECONNECT):null;constructor(e){e==="h3"?this.transport=new av(this.events):this.transport=new fv(this.events)}connect(e,t){if(Dl){const n=this.events.onopen;this.events.onopen=r=>{ur.push(this.#t),n?.(r)};const s=this.events.onclose;this.events.onclose=r=>{ur.splice(ur.indexOf(this.#t),1),s?.(r)}}this.url=e,this.options=t,this.transport.connect(e,t)}send(e){this.transport.send(e)}sendUnreliable(e){this.transport.sendUnreliable(e)}reconnect(e){const t=new URL(this.url);for(const n in e)t.searchParams.set(n,e[n]);this.transport.connect(t.toString(),this.options)}close(e,t){this.transport.close(e,t)}get isOpen(){return this.transport.isOpen}}const Lu={};function Uu(i,e){Lu[i]=e}function Jh(i){const e=Lu[i];if(!e)throw new Error("missing serializer: "+i);return e}const Nu=()=>({emit(i,...e){let t=this.events[i]||[];for(let n=0,s=t.length;n<s;n++)t[n](...e)},events:{},on(i,e){return this.events[i]?.push(e)||(this.events[i]=[e]),()=>{this.events[i]=this.events[i]?.filter(t=>e!==t)}}});class uv{handlers=[];register(e,t=!1){return this.handlers.push(e),this}invoke(...e){this.handlers.forEach(t=>t.apply(this,e))}invokeAsync(...e){return Promise.all(this.handlers.map(t=>t.apply(this,e)))}remove(e){const t=this.handlers.indexOf(e);this.handlers[t]=this.handlers[this.handlers.length-1],this.handlers.pop()}clear(){this.handlers=[]}}function Ps(){const i=new uv;function e(t){return i.register(t,this===null)}return e.once=t=>{const n=function(...s){t.apply(this,s),i.remove(n)};i.register(n)},e.remove=t=>i.remove(t),e.invoke=(...t)=>i.invoke(...t),e.invokeAsync=(...t)=>i.invokeAsync(...t),e.clear=()=>i.clear(),e}class Fu{state;decoder;setState(e,t){this.decoder.decode(e,t)}getState(){return this.state}patch(e,t){return this.decoder.decode(e,t)}teardown(){this.decoder.root.clearRefs()}handshake(e,t){this.state?(Ys.decode(e,t),this.decoder=new Ca(this.state)):(this.decoder=Ys.decode(e,t),this.state=this.decoder.state)}}function Qh(){return typeof performance<"u"?performance.now():Date.now()}class dv{roomId;sessionId;reconnectionToken;name;connection;onStateChange=Ps();onError=Ps();onLeave=Ps();onReconnect=Ps();onDrop=Ps();onJoin=Ps();serializerId;serializer;reconnection={retryCount:0,maxRetries:15,delay:100,minDelay:100,maxDelay:5e3,minUptime:5e3,backoff:pv,maxEnqueuedMessages:10,enqueuedMessages:[],isReconnecting:!1};joinedAtTime=0;onMessageHandlers=Nu();packr;#t=0;#e=void 0;constructor(e,t){if(this.name=e,this.packr=new Pu,this.packr.encode(void 0),t){const n=new(Jh("schema"));this.serializer=n;const s=new t;n.state=s,n.decoder=new Ca(s)}this.onLeave(()=>{this.removeAllListeners(),this.destroy()})}connect(e,t,n){this.connection=new Iu(t.protocol),this.connection.events.onmessage=this.onMessageCallback.bind(this),this.connection.events.onclose=r=>{if(this.joinedAtTime===0){console.warn?.(`Room connection was closed unexpectedly (${r.code}): ${r.reason}`),this.onError.invoke(r.code,r.reason);return}r.code===Vn.NO_STATUS_RECEIVED||r.code===Vn.ABNORMAL_CLOSURE||r.code===Vn.GOING_AWAY||r.code===Vn.MAY_TRY_RECONNECT?(this.onDrop.invoke(r.code,r.reason),this.handleReconnection()):this.onLeave.invoke(r.code,r.reason)},this.connection.events.onerror=r=>{this.onError.invoke(r.code,r.reason)};const s=this.serializer?.getState()!==void 0;if(t.protocol==="h3"){const r=new URL(e);this.connection.connect(r.origin,{...t,skipHandshake:s})}else this.connection.connect(`${e}${s?"&skipHandshake=1":""}`,n)}leave(e=!0){return new Promise(t=>{this.onLeave(n=>t(n)),this.connection?e?(this.packr.buffer[0]=en.LEAVE_ROOM,this.connection.send(this.packr.buffer.subarray(0,1))):this.connection.close():this.onLeave.invoke(Vn.CONSENTED)})}onMessage(e,t){return this.onMessageHandlers.on(this.getMessageHandlerKey(e),t)}ping(e){this.connection?.isOpen&&(this.#t=Qh(),this.#e=e,this.packr.buffer[0]=en.PING,this.connection.send(this.packr.buffer.subarray(0,1)))}send(e,t){const n={offset:1};this.packr.buffer[0]=en.ROOM_DATA,typeof e=="string"?wt.string(this.packr.buffer,e,n):wt.number(this.packr.buffer,e,n),this.packr.position=0;const s=t!==void 0?this.packr.pack(t,2048+n.offset):this.packr.buffer.subarray(0,n.offset);this.connection.isOpen?this.connection.send(s):ef(this,new Uint8Array(s))}sendUnreliable(e,t){if(!this.connection.isOpen)return;const n={offset:1};this.packr.buffer[0]=en.ROOM_DATA,typeof e=="string"?wt.string(this.packr.buffer,e,n):wt.number(this.packr.buffer,e,n),this.packr.position=0;const s=t!==void 0?this.packr.pack(t,2048+n.offset):this.packr.buffer.subarray(0,n.offset);this.connection.sendUnreliable(s)}sendBytes(e,t){const n={offset:1};if(this.packr.buffer[0]=en.ROOM_DATA_BYTES,typeof e=="string"?wt.string(this.packr.buffer,e,n):wt.number(this.packr.buffer,e,n),t.byteLength+n.offset>this.packr.buffer.byteLength){const s=new Uint8Array(n.offset+t.byteLength);s.set(this.packr.buffer),this.packr.useBuffer(s)}this.packr.buffer.set(t,n.offset),this.connection.isOpen?this.connection.send(this.packr.buffer.subarray(0,n.offset+t.byteLength)):ef(this,this.packr.buffer.subarray(0,n.offset+t.byteLength))}get state(){return this.serializer.getState()}removeAllListeners(){this.onJoin.clear(),this.onStateChange.clear(),this.onError.clear(),this.onLeave.clear(),this.onReconnect.clear(),this.onDrop.clear(),this.onMessageHandlers.events={},this.serializer instanceof Fu&&(this.serializer.decoder.root.callbacks={})}onMessageCallback(e){const t=new Uint8Array(e.data),n={offset:1},s=t[0];if(s===en.JOIN_ROOM){const r=yt.utf8Read(t,n,t[n.offset++]);if(this.serializerId=yt.utf8Read(t,n,t[n.offset++]),!this.serializer){const a=Jh(this.serializerId);this.serializer=new a}if(t.byteLength>n.offset&&this.serializer.handshake&&this.serializer.handshake(t,n),this.joinedAtTime===0?(this.joinedAtTime=Date.now(),this.onJoin.invoke()):(console.info(`[Colyseus reconnection]: ${String.fromCodePoint(9989)} reconnection successful!`),this.reconnection.isReconnecting=!1,this.onReconnect.invoke()),this.reconnectionToken=`${this.roomId}:${r}`,this.packr.buffer[0]=en.JOIN_ROOM,this.connection.send(this.packr.buffer.subarray(0,1)),this.reconnection.enqueuedMessages.length>0){for(const a of this.reconnection.enqueuedMessages)this.connection.send(a.data);this.reconnection.enqueuedMessages=[]}}else if(s===en.ERROR){const r=yt.number(t,n),a=yt.string(t,n);this.onError.invoke(r,a)}else if(s===en.LEAVE_ROOM)this.leave();else if(s===en.ROOM_STATE)this.serializer.setState(t,n),this.onStateChange.invoke(this.serializer.getState());else if(s===en.ROOM_STATE_PATCH)this.serializer.patch(t,n),this.onStateChange.invoke(this.serializer.getState());else if(s===en.ROOM_DATA){const r=yt.stringCheck(t,n)?yt.string(t,n):yt.number(t,n),a=t.byteLength>n.offset?jx(t,{start:n.offset}):void 0;this.dispatchMessage(r,a)}else if(s===en.ROOM_DATA_BYTES){const r=yt.stringCheck(t,n)?yt.string(t,n):yt.number(t,n);this.dispatchMessage(r,t.subarray(n.offset))}else s===en.PING&&(this.#e?.(Math.round(Qh()-this.#t)),this.#e=void 0)}dispatchMessage(e,t){const n=this.getMessageHandlerKey(e);this.onMessageHandlers.events[n]?this.onMessageHandlers.emit(n,t):this.onMessageHandlers.events["*"]?this.onMessageHandlers.emit("*",e,t):n.startsWith("__")||console.warn?.(`@colyseus/sdk: onMessage() not registered for type '${e}'.`)}destroy(){this.serializer&&this.serializer.teardown()}getMessageHandlerKey(e){switch(typeof e){case"string":return e;case"number":return`i${e}`;default:throw new Error("invalid message type.")}}handleReconnection(){if(Date.now()-this.joinedAtTime<this.reconnection.minUptime){console.info(`[Colyseus reconnection]: ${String.fromCodePoint(10060)} Room has not been up for long enough for automatic reconnection. (min uptime: ${this.reconnection.minUptime}ms)`),this.onLeave.invoke(Vn.ABNORMAL_CLOSURE,"Room uptime too short for reconnection.");return}this.reconnection.isReconnecting||(this.reconnection.retryCount=0,this.reconnection.isReconnecting=!0),this.retryReconnection()}retryReconnection(){if(this.reconnection.retryCount>=this.reconnection.maxRetries){console.info(`[Colyseus reconnection]: ${String.fromCodePoint(10060)} ❌ Reconnection failed after ${this.reconnection.maxRetries} attempts.`),this.reconnection.isReconnecting=!1,this.onLeave.invoke(Vn.FAILED_TO_RECONNECT,"No more retries. Reconnection failed.");return}this.reconnection.retryCount++;const e=Math.min(this.reconnection.maxDelay,Math.max(this.reconnection.minDelay,this.reconnection.backoff(this.reconnection.retryCount,this.reconnection.delay)));console.info(`[Colyseus reconnection]: ${String.fromCodePoint(9203)} will retry in ${(e/1e3).toFixed(1)} seconds...`),setTimeout(()=>{try{console.info(`[Colyseus reconnection]: ${String.fromCodePoint(128260)} Re-establishing sessionId '${this.sessionId}' with roomId '${this.roomId}'... (attempt ${this.reconnection.retryCount} of ${this.reconnection.maxRetries})`),this.connection.reconnect({reconnectionToken:this.reconnectionToken.split(":")[1],skipHandshake:!0})}catch{this.retryReconnection()}},e)}}const pv=(i,e)=>Math.floor(Math.pow(2,i)*e);function ef(i,e){i.reconnection.enqueuedMessages.push({data:e}),i.reconnection.enqueuedMessages.length>i.reconnection.maxEnqueuedMessages&&i.reconnection.enqueuedMessages.shift()}function mv(i){if(i===void 0)return!1;const e=typeof i;return e==="string"||e==="number"||e==="boolean"||e===null?!0:e!=="object"?!1:Array.isArray(i)?!0:i.buffer?!1:i.constructor&&i.constructor.name==="Object"||typeof i.toJSON=="function"}function gv(i,e){const{params:t,query:n}=e||{},[s,r]=i.split("?");let a=s;if(t)if(Array.isArray(t)){const c=a.split("/").filter(h=>h.startsWith(":"));for(const[h,u]of c.entries()){const f=t[h];a=a.replace(u,f)}}else for(const[c,h]of Object.entries(t))a=a.replace(`:${c}`,String(h));const o=new URLSearchParams(r);if(n)for(const[c,h]of Object.entries(n))h!=null&&o.set(c,String(h));let l=o.toString();return l=l.length>0?`?${l}`.replace(/\+/g,"%20"):"",`${a}${l}`}class _v{authToken;options;sdk;del=this.delete;constructor(e,t){this.sdk=e,this.options=t}async request(e,t,n){return this.executeRequest(e,t,n)}get(e,t){return this.request("GET",e,t)}post(e,t){return this.request("POST",e,t)}delete(e,t){return this.request("DELETE",e,t)}patch(e,t){return this.request("PATCH",e,t)}put(e,t){return this.request("PUT",e,t)}async executeRequest(e,t,n){let s=this.options.body?{...this.options.body,...n?.body||{}}:n?.body;const r=this.options.query?{...this.options.query,...n?.query||{}}:n?.query,a=this.options.params?{...this.options.params,...n?.params||{}}:n?.params,o=new Headers(this.options.headers?{...this.options.headers,...n?.headers||{}}:n?.headers);if(this.authToken&&!o.has("authorization")&&o.set("authorization",`Bearer ${this.authToken}`),mv(s)&&typeof s=="object"&&s!==null){o.has("content-type")||o.set("content-type","application/json");for(const[d,g]of Object.entries(s))g instanceof Date&&(s[d]=g.toISOString());s=JSON.stringify(s)}const l={credentials:n?.credentials||"include",...this.options,...n,query:r,params:a,headers:o,body:s,method:e},c=gv(this.sdk.getHttpEndpoint(t.toString()),l);let h;try{h=await fetch(c,l)}catch(d){if(d.name==="AbortError")throw d;const g=new hr(d.cause?.code||d.code,d.message);throw g.response=h,g.cause=d.cause,g}const u=h.headers.get("content-type");let f;if(u?.indexOf("json")?f=await h.json():u?.indexOf("text")?f=await h.text():f=await h.blob(),!h.ok)throw new hr(h.status,f.message??f.error??h.statusText,{headers:h.headers,status:h.status,response:h,data:f});return{raw:h,data:f,headers:h.headers,status:h.status,statusText:h.statusText}}}let ji;function pc(){if(!ji)try{ji=typeof cc<"u"&&cc.sys&&cc.sys.localStorage?cc.sys.localStorage:window.localStorage}catch{}return!ji&&typeof globalThis.indexedDB<"u"&&(ji=new Sv),ji||(ji={cache:{},setItem:function(i,e){this.cache[i]=e},getItem:function(i){this.cache[i]},removeItem:function(i){delete this.cache[i]}}),ji}function xv(i,e){pc().setItem(i,e)}function vv(i){pc().removeItem(i)}function yv(i,e){const t=pc().getItem(i);typeof Promise>"u"||!(t instanceof Promise)?e(t):t.then(n=>e(n))}class Sv{dbPromise=new Promise(e=>{const t=indexedDB.open("_colyseus_storage",1);t.onupgradeneeded=()=>t.result.createObjectStore("store"),t.onsuccess=()=>e(t.result)});async tx(e,t){const s=(await this.dbPromise).transaction("store",e).objectStore("store");return t(s)}setItem(e,t){return this.tx("readwrite",n=>n.put(t,e)).then()}async getItem(e){const t=await this.tx("readonly",n=>n.get(e));return new Promise(n=>{t.onsuccess=()=>n(t.result)})}removeItem(e){return this.tx("readwrite",t=>t.delete(e)).then()}}class Mv{settings={path:"/auth",key:"colyseus-auth-token"};#t=!1;#e=null;#n=Nu();http;constructor(e){this.http=e,yv(this.settings.key,t=>this.token=t)}set token(e){this.http.authToken=e}get token(){return this.http.authToken}onChange(e){const t=this.#n.on("change",e);return this.#t||this.getUserData().then(n=>{this.emitChange({...n,token:this.token})}).catch(n=>{this.emitChange({user:null,token:void 0})}),this.#t=!0,t}async getUserData(){if(this.token)return(await this.http.get(`${this.settings.path}/userdata`)).data;throw new Error("missing auth.token")}async registerWithEmailAndPassword(e,t,n){const s=(await this.http.post(`${this.settings.path}/register`,{body:{email:e,password:t,options:n}})).data;return this.emitChange(s),s}async signInWithEmailAndPassword(e,t){const n=(await this.http.post(`${this.settings.path}/login`,{body:{email:e,password:t}})).data;return this.emitChange(n),n}async signInAnonymously(e){const t=(await this.http.post(`${this.settings.path}/anonymous`,{body:{options:e}})).data;return this.emitChange(t),t}async sendPasswordResetEmail(e){return(await this.http.post(`${this.settings.path}/forgot-password`,{body:{email:e}})).data}async signInWithProvider(e,t={}){return new Promise((n,s)=>{const r=t.width||480,a=t.height||768,o=this.token?`?token=${this.token}`:"",l=`Login with ${e[0].toUpperCase()+e.substring(1)}`,c=this.http.sdk.getHttpEndpoint(`${t.prefix||`${this.settings.path}/provider`}/${e}${o}`),h=screen.width/2-r/2,u=screen.height/2-a/2;this.#e=window.open(c,l,"toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width="+r+", height="+a+", top="+u+", left="+h);const f=g=>{g.data.user===void 0&&g.data.token===void 0||(clearInterval(d),this.#e?.close(),this.#e=null,window.removeEventListener("message",f),g.data.error!==void 0?s(g.data.error):(n(g.data),this.emitChange(g.data)))},d=setInterval(()=>{(!this.#e||this.#e.closed)&&(this.#e=null,s("cancelled"),window.removeEventListener("message",f))},200);window.addEventListener("message",f)})}async signOut(){this.emitChange({user:null,token:null})}emitChange(e){e.token!==void 0&&(this.token=e.token,e.token===null?vv(this.settings.key):xv(this.settings.key,e.token)),this.#n.emit("change",e)}}function Ev(i){const e=window?.location?.hostname||"localhost",t=i.hostname.split("."),n=!i.hostname.includes("trycloudflare.com")&&!i.hostname.includes("discordsays.com")&&t.length>2?`/${t[0]}`:"";return i.pathname.startsWith("/.proxy")?`${i.protocol}//${e}${n}${i.pathname}${i.search}`:`${i.protocol}//${e}/.proxy/colyseus${n}${i.pathname}${i.search}`}const tf=typeof window<"u"&&typeof window?.location?.hostname<"u"?`${window.location.protocol.replace("http","ws")}//${window.location.hostname}${window.location.port&&`:${window.location.port}`}`:"ws://127.0.0.1:2567";class mc{static VERSION="0.17";http;auth;settings;urlBuilder;constructor(e=tf,t){if(typeof e=="string"){const n=e.startsWith("/")?new URL(e,tf):new URL(e),s=n.protocol==="https:"||n.protocol==="wss:",r=Number(n.port||(s?443:80));this.settings={hostname:n.hostname,pathname:n.pathname,port:r,secure:s,searchParams:n.searchParams.toString()||void 0}}else e.port===void 0&&(e.port=e.secure?443:80),e.pathname===void 0&&(e.pathname=""),this.settings=e;this.settings.pathname.endsWith("/")&&(this.settings.pathname=this.settings.pathname.slice(0,-1)),t?.protocol&&(this.settings.protocol=t.protocol),this.http=new _v(this,{headers:t?.headers||{}}),this.auth=new Mv(this.http),this.urlBuilder=t?.urlBuilder,!this.urlBuilder&&typeof window<"u"&&window?.location?.hostname?.includes("discordsays.com")&&(this.urlBuilder=Ev,console.log("Colyseus SDK: Discord Embedded SDK detected. Using custom URL builder."))}static async selectByLatency(e,t,n={}){const s=e.map(a=>new mc(a,t)),r=(await Promise.allSettled(s.map((a,o)=>a.getLatency(n).then(l=>{const c=s[o].settings;return console.log(`🛜 Endpoint Latency: ${l}ms - ${c.hostname}:${c.port}${c.pathname}`),[o,l]})))).filter(a=>a.status==="fulfilled").map(a=>a.value);if(r.length===0)throw new Error("All endpoints failed to respond");return s[r.sort((a,o)=>a[1]-o[1])[0][0]]}async joinOrCreate(e,t={},n){return await this.createMatchMakeRequest("joinOrCreate",e,t,n)}async create(e,t={},n){return await this.createMatchMakeRequest("create",e,t,n)}async join(e,t={},n){return await this.createMatchMakeRequest("join",e,t,n)}async joinById(e,t={},n){return await this.createMatchMakeRequest("joinById",e,t,n)}async reconnect(e,t){if(typeof e=="string"&&typeof t=="string")throw new Error("DEPRECATED: .reconnect() now only accepts 'reconnectionToken' as argument.\nYou can get this token from previously connected `room.reconnectionToken`");const[n,s]=e.split(":");if(!n||!s)throw new Error(`Invalid reconnection token format.
The format should be roomId:reconnectionToken`);return await this.createMatchMakeRequest("reconnect",n,{reconnectionToken:s},t)}async consumeSeatReservation(e,t){const n=this.createRoom(e.name,t);n.roomId=e.roomId,n.sessionId=e.sessionId;const s={sessionId:n.sessionId};return e.reconnectionToken&&(s.reconnectionToken=e.reconnectionToken),n.connect(this.buildEndpoint(e,s),e,this.http.options.headers),new Promise((r,a)=>{const o=(l,c)=>a(new hr(l,c));n.onError.once(o),n.onJoin.once(()=>{n.onError.remove(o),r(n)})})}getLatency(e={}){const t=e.protocol??"ws",n=e.pingCount??1;return new Promise((s,r)=>{const a=new Iu(t),o=[];let l=0;a.events.onopen=()=>{l=Date.now(),a.send(new Uint8Array([en.PING]))},a.events.onmessage=c=>{if(o.push(Date.now()-l),o.length<n)l=Date.now(),a.send(new Uint8Array([en.PING]));else{a.close();const h=o.reduce((u,f)=>u+f,0)/o.length;s(h)}},a.events.onerror=c=>{r(new hr(Vn.ABNORMAL_CLOSURE,`Failed to get latency: ${c.message}`))},a.connect(this.getHttpEndpoint())})}async createMatchMakeRequest(e,t,n={},s){try{if(!t)throw new Error("Must provide a room name");const a=(await this.http.post(`/matchmake/${e}/${t}`,{headers:{Accept:"application/json","Content-Type":"application/json"},body:n})).data;return e==="reconnect"&&(a.reconnectionToken=n.reconnectionToken),await this.consumeSeatReservation(a,s)}catch(r){throw r instanceof hr?new ec(r.message,r.code):r}}createRoom(e,t){return new dv(e,t)}buildEndpoint(e,t={}){let n=this.settings.protocol||"ws",s=this.settings.searchParams||"";this.http.authToken&&(t._authToken=this.http.authToken);for(const o in t)t.hasOwnProperty(o)&&(s+=(s?"&":"")+`${o}=${t[o]}`);n==="h3"&&(n="http");let r=this.settings.secure?`${n}s://`:`${n}://`;e.publicAddress?r+=`${e.publicAddress}`:r+=`${this.settings.hostname}${this.getEndpointPort()}${this.settings.pathname}`;const a=`${r}/${e.processId}/${e.roomId}?${s}`;return this.urlBuilder?this.urlBuilder(new URL(a)):a}getHttpEndpoint(e=""){const t=e.startsWith("/")?e:`/${e}`;let n=`${this.settings.secure?"https":"http"}://${this.settings.hostname}${this.getEndpointPort()}${this.settings.pathname}${t}`;return this.settings.searchParams&&(n+=`?${this.settings.searchParams}`),this.urlBuilder?this.urlBuilder(new URL(n)):n}getEndpointPort(){return this.settings.port!==80&&this.settings.port!==443?`:${this.settings.port}`:""}}const bv=mc;class wv{setState(e){}getState(){return null}patch(e){}teardown(){}handshake(e){}}Uu("schema",Fu);Uu("none",wv);class Oa extends vt{constructor(){super(),this.sessionId="",this.name="",this.x=0,this.y=0,this.floor=1,this.zone="town",this.hp=100,this.maxHp=100,this.mana=3,this.maxMana=3,this.deck=new jt,this.hand=new jt,this.discard=new jt}}hc(Oa,{sessionId:"string",name:"string",x:"number",y:"number",floor:"number",zone:"string",hp:"number",maxHp:"number",mana:"number",maxMana:"number",deck:["string"],hand:["string"],discard:["string"]});class gc extends vt{constructor(){super(...arguments),this.id="",this.kind="",this.x=0,this.y=0,this.scale=1,this.rotation=0}}hc(gc,{id:"string",kind:"string",x:"number",y:"number",scale:"number",rotation:"number"});class _c extends vt{constructor(){super(...arguments),this.players=new ln,this.scenery=new ln}}hc(_c,{players:{map:Oa},scenery:{map:gc}});var Tv=Object.defineProperty,zi=(i,e,t,n)=>{for(var s=void 0,r=i.length-1,a;r>=0;r--)(a=i[r])&&(s=a(e,t,s)||s);return s&&Tv(e,t,s),s};class yi extends vt{constructor(){super(),this.id="",this.name="",this.x=0,this.y=0,this.hp=0,this.maxHp=0,this.action="idle",this.attackRadius=0}}zi([Mn("string")],yi.prototype,"id");zi([Mn("string")],yi.prototype,"name");zi([Mn("number")],yi.prototype,"x");zi([Mn("number")],yi.prototype,"y");zi([Mn("number")],yi.prototype,"hp");zi([Mn("number")],yi.prototype,"maxHp");zi([Mn("string")],yi.prototype,"action");zi([Mn("number")],yi.prototype,"attackRadius");var Av=Object.defineProperty,Ba=(i,e,t,n)=>{for(var s=void 0,r=i.length-1,a;r>=0;r--)(a=i[r])&&(s=a(e,t,s)||s);return s&&Av(e,t,s),s};class Tr extends vt{constructor(){super(),this.floor=1,this.zone="field",this.players=new ln,this.enemies=new ln}}Ba([Mn("number")],Tr.prototype,"floor");Ba([Mn("string")],Tr.prototype,"zone");Ba([Mn({map:Oa})],Tr.prototype,"players");Ba([Mn({map:yi})],Tr.prototype,"enemies");const Ou=new bv("ws://localhost:2567");async function Cv(i){return await Ou.joinOrCreate("town",{name:i},_c)}async function Rv(i){return await Ou.joinOrCreate("field",{name:i},Tr)}class xc{constructor(e){this.playerMeshes=new Map,this.playerVisuals=new Map,this.sceneryVisuals=new Map,this.animationId=0,this.onResize=()=>{this.camera.aspect=window.innerWidth/window.innerHeight,this.camera.updateProjectionMatrix(),this.renderer.setSize(window.innerWidth,window.innerHeight)},this.animate=()=>{this.animationId=requestAnimationFrame(this.animate),this.updateInterpolatedPlayers(),this.updateParticles(),this.renderer.render(this.scene,this.camera)},this.container=e,this.scene=new Df,this.scene.background=new He(7120577),this.scene.fog=new Yl(7120577,.008),this.camera=new hn(50,window.innerWidth/window.innerHeight,.1,1e3),this.camera.position.set(0,28,22),this.camera.lookAt(0,0,0),this.renderer=new Zf({antialias:!0,alpha:!1}),this.renderer.setPixelRatio(Math.min(window.devicePixelRatio,2)),this.renderer.setSize(window.innerWidth,window.innerHeight),this.renderer.shadowMap.enabled=!0,this.renderer.shadowMap.type=cr,this.container.appendChild(this.renderer.domElement),this.createLights(),this.buildTownOfBeginnings(),this.portalGroup=this.createTeleportGate(),window.addEventListener("resize",this.onResize),this.animate()}createLights(){const e=new Hf(16777215,.85);this.scene.add(e);const t=new Gf(16775867,1.6);t.position.set(40,100,40),t.castShadow=!0,t.shadow.mapSize.width=2048,t.shadow.mapSize.height=2048,t.shadow.camera.left=-80,t.shadow.camera.right=80,t.shadow.camera.top=80,t.shadow.camera.bottom=-80,t.shadow.bias=-5e-4,this.scene.add(t)}buildTownOfBeginnings(){this.createTowerPerimeter();const e=new An(150,150),t=new Pt({color:5610581,roughness:.8,metalness:.1}),n=new Ie(e,t);n.rotation.x=-Math.PI/2,n.receiveShadow=!0,this.scene.add(n);const s=new An(24,55),r=new Pt({color:9082263,roughness:.9}),a=new Ie(s,r);a.rotation.x=-Math.PI/2,a.position.set(0,.05,-5),a.receiveShadow=!0,this.scene.add(a),this.createFountain(),this.createGrandTavern(-12,0,0)}addScenery(e,t,n,s,r,a){if(this.sceneryVisuals.has(e))return;let o;if(t==="tree"){o=new Nn;const l=new on(.4,.6,2,5),c=new Pt({color:6045747}),h=new Ie(l,c);h.position.y=1,h.castShadow=!0,h.receiveShadow=!0,o.add(h);const u=new Pt({color:3042104}),f=new wa(2.5,3,5),d=new Ie(f,u);d.position.y=2.5,d.castShadow=!0,o.add(d);const g=new wa(1.8,2.5,5),v=new Ie(g,u);v.position.y=4,v.castShadow=!0,o.add(v)}else{const l=new Kl(1,0),c=new Pt({color:7829367,roughness:.9});o=new Ie(l,c),o.castShadow=!0,o.receiveShadow=!0}o.scale.set(r,r,r),o.rotation.y=a,t==="rock"&&(o.rotation.set(a,a,a),o.scale.y=r*.7),o.position.set(n,t==="rock"?.2:0,s),this.scene.add(o),this.sceneryVisuals.set(e,{mesh:o})}removeScenery(e){const t=this.sceneryVisuals.get(e);t&&(this.scene.remove(t.mesh),this.sceneryVisuals.delete(e))}createTowerPerimeter(){const s=new Pt({color:3817546,roughness:.9,metalness:.2}),r=new Mt(190,140,20),a=new Ie(r,s);a.position.set(0,140/2,-150/2-20/2),a.receiveShadow=!0,this.scene.add(a);const o=new Mt(190,140,20),l=new Ie(o,s);l.position.set(0,140/2,150/2+20/2),l.receiveShadow=!0,this.scene.add(l);const c=new Mt(20,140,150),h=new Ie(c,s);h.position.set(150/2+20/2,140/2,0),h.receiveShadow=!0,this.scene.add(h);const u=new Mt(20,140,150),f=new Ie(u,s);f.position.set(-150/2-20/2,140/2,0),f.receiveShadow=!0,this.scene.add(f);const d=new on(12,12,140,16),g=new Pt({color:2830392,roughness:1}),v=[[150/2,-150/2],[-150/2,-150/2],[150/2,150/2],[-150/2,150/2]];for(const[w,M]of v){const D=new Ie(d,g);D.position.set(w,140/2,M),D.receiveShadow=!0,D.castShadow=!0,this.scene.add(D)}const m=new An(190,190),p=new Pt({color:1711396,roughness:1}),y=new Ie(m,p);y.rotation.x=Math.PI/2,y.position.y=140,this.scene.add(y)}createFountain(){const e=new Nn,t=new on(3.5,3.5,.6,8),n=new Pt({color:10200229}),s=new Ie(t,n);s.position.y=.4,s.castShadow=!0,s.receiveShadow=!0,e.add(s);const r=new on(3.1,3.1,.65,8),a=new Pt({color:2271999,transparent:!0,opacity:.85,roughness:.1,metalness:.3}),o=new Ie(r,a);o.position.y=.4,e.add(o);const l=new on(.6,.8,3.5,6),c=new Ie(l,n);c.position.y=1.8,c.castShadow=!0,e.add(c);const h=new na(4504575,2.5,12);h.position.set(0,2,0),e.add(h),this.createFountainParticles(e),e.position.set(0,0,8),this.scene.add(e)}createFountainParticles(e){const n=new Yt,s=new Float32Array(450),r=new Float32Array(450);for(let l=0;l<150;l++)s[l*3]=(Math.random()-.5)*.4,s[l*3+1]=3.3+Math.random()*.5,s[l*3+2]=(Math.random()-.5)*.4,r[l*3]=(Math.random()-.5)*.05,r[l*3+1]=.05+Math.random()*.08,r[l*3+2]=(Math.random()-.5)*.05;n.setAttribute("position",new Sn(s,3));const a=new xl({color:13434879,size:.2,transparent:!0,opacity:.6,blending:_a,depthWrite:!1}),o=new ih(n,a);e.add(o),this.fountainParticles={mesh:o,positions:s,velocities:r}}createGrandTavern(e,t,n){const s=new Nn,r=new Pt({color:15130572}),a=new Pt({color:8020807}),o=new Pt({color:4073251}),l=1.2,c=5.5,h=30,u=40,f=20,d=new An(h,u),g=new Ie(d,a);g.rotation.x=-Math.PI/2,g.position.set(-h/2,.1,0),g.receiveShadow=!0,s.add(g);const v=new An(f,f),m=new Ie(v,a);m.rotation.x=-Math.PI/2,m.position.set(-h-f/2,.1,-u/2+f/2),m.receiveShadow=!0,s.add(m);const p=new Nn,y=new Mt(h+f+l,c,l),w=new Ie(y,r);w.position.set(-h/2-f/2,c/2,-u/2+l/2),w.castShadow=!0,w.receiveShadow=!0,p.add(w);const M=(u-8)/2,D=new Mt(l,c,M),R=new Ie(D,r);R.position.set(-l/2,c/2,-u/2+M/2),R.castShadow=!0,R.receiveShadow=!0,p.add(R);const L=new Ie(D,r);L.position.set(-l/2,c/2,u/2-M/2),L.castShadow=!0,L.receiveShadow=!0,p.add(L);const x=new Mt(h+l,c,l),E=new Ie(x,r);E.position.set(-h/2,c/2,u/2-l/2),E.castShadow=!0,E.receiveShadow=!0,p.add(E);const X=new Mt(l,c,u-f),I=new Ie(X,r);I.position.set(-h+l/2,c/2,f/2),I.castShadow=!0,I.receiveShadow=!0,p.add(I);const G=new Mt(f+l,c,l),b=new Ie(G,r);b.position.set(-h-f/2,c/2,-u/2+f-l/2),b.castShadow=!0,b.receiveShadow=!0,p.add(b);const U=new Mt(l,c,f),C=new Ie(U,r);C.position.set(-h-f+l/2,c/2,-u/2+f/2),C.castShadow=!0,C.receiveShadow=!0,p.add(C),s.add(p);const P=new Mt(20,1.5,2),A=new Ie(P,o);A.position.set(-h/2-5,.75,-u/2+5),A.castShadow=!0,A.receiveShadow=!0,s.add(A);const q=new on(.35,.35,.9,8);for(let J=0;J<9;J++){const ae=new Ie(q,o);ae.position.set(-h/2-13+J*2,.45,-u/2+7.5),ae.castShadow=!0,ae.receiveShadow=!0,s.add(ae)}const j=-h+8,ee=-2;for(let J=0;J<3;J++)for(let ae=0;ae<2;ae++)this.createTableSet(s,j+ae*10,ee+J*8,o);const se=new Pt({color:4473924}),ie=new Mt(6,2,6),Pe=new Ie(ie,se);Pe.position.set(-h-f/2+2,1,-u/2+f/2-2),Pe.receiveShadow=!0,s.add(Pe);const qe=new na(16755268,4,20);qe.position.set(-h-f/2+2,3,-u/2+f/2-2),s.add(qe);const Ke=new na(16764040,1.5,25);Ke.position.set(-h/2,5,5),s.add(Ke),s.position.set(e,0,t),s.rotation.y=n,this.scene.add(s)}createTableSet(e,t,n,s){const r=new Mt(4.5,1.2,3),a=new Ie(r,s);a.position.set(t,.6,n),a.castShadow=!0,a.receiveShadow=!0,e.add(a);const o=new on(.35,.35,.8,6),l=[[-1.5,2.2],[0,2.2],[1.5,2.2],[-1.5,-2.2],[0,-2.2],[1.5,-2.2]];for(const c of l){const h=new Ie(o,s);h.position.set(t+c[0],.4,n+c[1]),h.castShadow=!0,h.receiveShadow=!0,e.add(h)}}createTeleportGate(){const e=new Nn,t=new Pt({color:2829099,roughness:.8}),n=new on(6,6.5,.4,8),s=new Ie(n,t);s.position.y=.2,s.receiveShadow=!0,s.castShadow=!0,e.add(s);const r=new Mt(1.5,8,1.5),a=new Ie(r,t);a.position.set(-3.5,4,0),a.castShadow=!0,e.add(a);const o=new Ie(r,t);o.position.set(3.5,4,0),o.castShadow=!0,e.add(o);const l=new Mt(8.5,1.5,1.8),c=new Ie(l,t);c.position.set(0,8.75,0),c.castShadow=!0,e.add(c);const h=new An(5.5,7.5),u=new Fs({color:65535,transparent:!0,opacity:.7,side:Hn}),f=new Ie(h,u);f.position.set(0,4.25,0),e.add(f);const d=new na(65535,3,20);return d.position.set(0,4,2),e.add(d),this.createPortalParticles(e),e.position.set(0,0,-28),this.scene.add(e),e}createPortalParticles(e){const n=new Yt,s=new Float32Array(360),r=new Float32Array(360);for(let l=0;l<120;l++)s[l*3]=(Math.random()-.5)*5,s[l*3+1]=.5+Math.random()*7.5,s[l*3+2]=(Math.random()-.5)*.5,r[l*3]=(Math.random()-.5)*.01,r[l*3+1]=.01+Math.random()*.03,r[l*3+2]=(Math.random()-.5)*.01;n.setAttribute("position",new Sn(s,3));const a=new xl({color:16777215,size:.15,transparent:!0,opacity:.8,blending:_a,depthWrite:!1}),o=new ih(n,a);e.add(o),this.portalParticles={mesh:o,positions:s,velocities:r}}createNameLabel(e){const t=document.createElement("canvas"),n=t.getContext("2d");if(!n)throw new Error("Could not create label canvas context");const s=28,r=16,a=10;n.font=`bold ${s}px Arial`;const o=Math.ceil(n.measureText(e).width);t.width=o+r*2,t.height=s+a*2,n.font=`bold ${s}px Arial`,n.textAlign="center",n.textBaseline="middle",n.fillStyle="rgba(0, 0, 0, 0.75)",this.roundRect(n,0,0,t.width,t.height,12),n.fill(),n.fillStyle="#ffffff",n.fillText(e,t.width/2,t.height/2);const l=new yl(t);l.minFilter=$t,l.generateMipmaps=!1;const c=new ui({map:l,transparent:!0,depthWrite:!1}),h=new Nf(c);return h.scale.set(3.2,1,1),h}roundRect(e,t,n,s,r,a){e.beginPath(),e.moveTo(t+a,n),e.lineTo(t+s-a,n),e.quadraticCurveTo(t+s,n,t+s,n+a),e.lineTo(t+s,n+r-a),e.quadraticCurveTo(t+s,n+r,t+s-a,n+r),e.lineTo(t+a,n+r),e.quadraticCurveTo(t,n+r,t,n+r-a),e.lineTo(t,n+a),e.quadraticCurveTo(t,n,t+a,n),e.closePath()}addPlayer(e,t,n=t?"You":"Player"){if(this.playerVisuals.has(e))return;const s=new Mt(1.5,2,1.5),r=new Pt({color:t?16729156:2280550,roughness:.7}),a=new Ie(s,r);a.position.set(0,1,0),a.castShadow=!0;const o=this.createNameLabel(n);o.position.set(0,3.2,0),a.add(o),this.scene.add(a),this.playerMeshes.set(e,a),this.playerVisuals.set(e,{mesh:a,labelSprite:o,targetPosition:new O(0,1,0)})}removePlayer(e){const t=this.playerVisuals.get(e);t&&(this.scene.remove(t.mesh),this.playerVisuals.delete(e),this.playerMeshes.delete(e))}updatePlayer(e,t,n,s){const r=this.playerVisuals.get(e);if(r&&(r.targetPosition.set(t,1,n),s&&r.labelSprite.material instanceof ui&&r.labelSprite.material.map?.image?.dataset?.labelText!==s)){const c=this.createNameLabel(s),h=r.labelSprite.material;r.mesh.remove(r.labelSprite),h.map?.dispose(),h.dispose(),r.labelSprite=c,r.labelSprite.position.set(0,3.2,0),r.mesh.add(r.labelSprite)}}updateInterpolatedPlayers(){for(const e of this.playerVisuals.values())e.mesh.position.lerp(e.targetPosition,.8)}updateParticles(){if(this.fountainParticles){const{positions:e,velocities:t,mesh:n}=this.fountainParticles;for(let s=0;s<e.length/3;s++)t[s*3+1]-=.005,e[s*3]+=t[s*3],e[s*3+1]+=t[s*3+1],e[s*3+2]+=t[s*3+2],e[s*3+1]<.7&&(e[s*3]=(Math.random()-.5)*.4,e[s*3+1]=3.3,e[s*3+2]=(Math.random()-.5)*.4,t[s*3]=(Math.random()-.5)*.05,t[s*3+1]=.05+Math.random()*.08,t[s*3+2]=(Math.random()-.5)*.05);n.geometry.attributes.position.needsUpdate=!0}if(this.portalParticles){const{positions:e,velocities:t,mesh:n}=this.portalParticles;for(let s=0;s<e.length/3;s++)e[s*3]+=t[s*3],e[s*3+1]+=t[s*3+1],e[s*3+2]+=t[s*3+2],e[s*3+1]>8&&(e[s*3]=(Math.random()-.5)*5,e[s*3+1]=.5,e[s*3+2]=(Math.random()-.5)*.5);n.geometry.attributes.position.needsUpdate=!0}}updateCameraFollow(e){const t=this.playerVisuals.get(e);if(!t)return;const n=t.mesh.position.x,s=t.mesh.position.z;this.camera.position.x+=(n+0-this.camera.position.x)*.08,this.camera.position.y+=(28-this.camera.position.y)*.08,this.camera.position.z+=(s+22-this.camera.position.z)*.08,this.camera.lookAt(n,0,s)}isNearPortal(e,t){const n=e-this.portalGroup.position.x,s=t-this.portalGroup.position.z;return Math.sqrt(n*n+s*s)<4.5}dispose(){cancelAnimationFrame(this.animationId),window.removeEventListener("resize",this.onResize);for(const e of this.playerVisuals.values())e.labelSprite.material instanceof ui&&(e.labelSprite.material.map?.dispose(),e.labelSprite.material.dispose()),e.mesh.material instanceof tn&&e.mesh.material.dispose(),e.mesh.geometry&&e.mesh.geometry.dispose();for(const e of this.sceneryVisuals.values())e.mesh instanceof Ie?(e.mesh.material instanceof tn&&e.mesh.material.dispose(),e.mesh.geometry&&e.mesh.geometry.dispose()):e.mesh instanceof Nn&&e.mesh.children.forEach(t=>{t instanceof Ie&&(t.material instanceof tn&&t.material.dispose(),t.geometry&&t.geometry.dispose())});this.fountainParticles&&(this.fountainParticles.mesh.geometry.dispose(),this.fountainParticles.mesh.material.dispose()),this.portalParticles&&(this.portalParticles.mesh.geometry.dispose(),this.portalParticles.mesh.material.dispose()),this.playerMeshes.clear(),this.playerVisuals.clear(),this.sceneryVisuals.clear(),this.renderer.dispose(),this.renderer.domElement.parentElement===this.container&&this.container.removeChild(this.renderer.domElement)}}const nf={type:"change"},vc={type:"start"},Bu={type:"end"},la=new Sr,sf=new fi,Pv=Math.cos(70*Dd.DEG2RAD),Ft=new O,cn=2*Math.PI,ht={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},To=1e-6;class Dv extends _p{constructor(e,t=null){super(e,t),this.state=ht.NONE,this.target=new O,this.cursor=new O,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.keyRotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:Ls.ROTATE,MIDDLE:Ls.DOLLY,RIGHT:Ls.PAN},this.touches={ONE:Ds.ROTATE,TWO:Ds.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._cursorStyle="auto",this._domElementKeyEvents=null,this._lastPosition=new O,this._lastQuaternion=new Oi,this._lastTargetPosition=new O,this._quat=new Oi().setFromUnitVectors(e.up,new O(0,1,0)),this._quatInverse=this._quat.clone().invert(),this._spherical=new fh,this._sphericalDelta=new fh,this._scale=1,this._panOffset=new O,this._rotateStart=new Le,this._rotateEnd=new Le,this._rotateDelta=new Le,this._panStart=new Le,this._panEnd=new Le,this._panDelta=new Le,this._dollyStart=new Le,this._dollyEnd=new Le,this._dollyDelta=new Le,this._dollyDirection=new O,this._mouse=new Le,this._performCursorZoom=!1,this._pointers=[],this._pointerPositions={},this._controlActive=!1,this._onPointerMove=Lv.bind(this),this._onPointerDown=Iv.bind(this),this._onPointerUp=Uv.bind(this),this._onContextMenu=Vv.bind(this),this._onMouseWheel=Ov.bind(this),this._onKeyDown=Bv.bind(this),this._onTouchStart=zv.bind(this),this._onTouchMove=kv.bind(this),this._onMouseDown=Nv.bind(this),this._onMouseMove=Fv.bind(this),this._interceptControlDown=Gv.bind(this),this._interceptControlUp=Hv.bind(this),this.domElement!==null&&this.connect(this.domElement),this.update()}set cursorStyle(e){this._cursorStyle=e,e==="grab"?this.domElement.style.cursor="grab":this.domElement.style.cursor="auto"}get cursorStyle(){return this._cursorStyle}connect(e){super.connect(e),this.domElement.addEventListener("pointerdown",this._onPointerDown),this.domElement.addEventListener("pointercancel",this._onPointerUp),this.domElement.addEventListener("contextmenu",this._onContextMenu),this.domElement.addEventListener("wheel",this._onMouseWheel,{passive:!1}),this.domElement.getRootNode().addEventListener("keydown",this._interceptControlDown,{passive:!0,capture:!0}),this.domElement.style.touchAction="none"}disconnect(){this.domElement.removeEventListener("pointerdown",this._onPointerDown),this.domElement.ownerDocument.removeEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.removeEventListener("pointerup",this._onPointerUp),this.domElement.removeEventListener("pointercancel",this._onPointerUp),this.domElement.removeEventListener("wheel",this._onMouseWheel),this.domElement.removeEventListener("contextmenu",this._onContextMenu),this.stopListenToKeyEvents(),this.domElement.getRootNode().removeEventListener("keydown",this._interceptControlDown,{capture:!0}),this.domElement.style.touchAction="auto"}dispose(){this.disconnect()}getPolarAngle(){return this._spherical.phi}getAzimuthalAngle(){return this._spherical.theta}getDistance(){return this.object.position.distanceTo(this.target)}listenToKeyEvents(e){e.addEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=e}stopListenToKeyEvents(){this._domElementKeyEvents!==null&&(this._domElementKeyEvents.removeEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=null)}saveState(){this.target0.copy(this.target),this.position0.copy(this.object.position),this.zoom0=this.object.zoom}reset(){this.target.copy(this.target0),this.object.position.copy(this.position0),this.object.zoom=this.zoom0,this.object.updateProjectionMatrix(),this.dispatchEvent(nf),this.update(),this.state=ht.NONE}pan(e,t){this._pan(e,t),this.update()}dollyIn(e){this._dollyIn(e),this.update()}dollyOut(e){this._dollyOut(e),this.update()}rotateLeft(e){this._rotateLeft(e),this.update()}rotateUp(e){this._rotateUp(e),this.update()}update(e=null){const t=this.object.position;Ft.copy(t).sub(this.target),Ft.applyQuaternion(this._quat),this._spherical.setFromVector3(Ft),this.autoRotate&&this.state===ht.NONE&&this._rotateLeft(this._getAutoRotationAngle(e)),this.enableDamping?(this._spherical.theta+=this._sphericalDelta.theta*this.dampingFactor,this._spherical.phi+=this._sphericalDelta.phi*this.dampingFactor):(this._spherical.theta+=this._sphericalDelta.theta,this._spherical.phi+=this._sphericalDelta.phi);let n=this.minAzimuthAngle,s=this.maxAzimuthAngle;isFinite(n)&&isFinite(s)&&(n<-Math.PI?n+=cn:n>Math.PI&&(n-=cn),s<-Math.PI?s+=cn:s>Math.PI&&(s-=cn),n<=s?this._spherical.theta=Math.max(n,Math.min(s,this._spherical.theta)):this._spherical.theta=this._spherical.theta>(n+s)/2?Math.max(n,this._spherical.theta):Math.min(s,this._spherical.theta)),this._spherical.phi=Math.max(this.minPolarAngle,Math.min(this.maxPolarAngle,this._spherical.phi)),this._spherical.makeSafe(),this.enableDamping===!0?this.target.addScaledVector(this._panOffset,this.dampingFactor):this.target.add(this._panOffset),this.target.sub(this.cursor),this.target.clampLength(this.minTargetRadius,this.maxTargetRadius),this.target.add(this.cursor);let r=!1;if(this.zoomToCursor&&this._performCursorZoom||this.object.isOrthographicCamera)this._spherical.radius=this._clampDistance(this._spherical.radius);else{const a=this._spherical.radius;this._spherical.radius=this._clampDistance(this._spherical.radius*this._scale),r=a!=this._spherical.radius}if(Ft.setFromSpherical(this._spherical),Ft.applyQuaternion(this._quatInverse),t.copy(this.target).add(Ft),this.object.lookAt(this.target),this.enableDamping===!0?(this._sphericalDelta.theta*=1-this.dampingFactor,this._sphericalDelta.phi*=1-this.dampingFactor,this._panOffset.multiplyScalar(1-this.dampingFactor)):(this._sphericalDelta.set(0,0,0),this._panOffset.set(0,0,0)),this.zoomToCursor&&this._performCursorZoom){let a=null;if(this.object.isPerspectiveCamera){const o=Ft.length();a=this._clampDistance(o*this._scale);const l=o-a;this.object.position.addScaledVector(this._dollyDirection,l),this.object.updateMatrixWorld(),r=!!l}else if(this.object.isOrthographicCamera){const o=new O(this._mouse.x,this._mouse.y,0);o.unproject(this.object);const l=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),this.object.updateProjectionMatrix(),r=l!==this.object.zoom;const c=new O(this._mouse.x,this._mouse.y,0);c.unproject(this.object),this.object.position.sub(c).add(o),this.object.updateMatrixWorld(),a=Ft.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),this.zoomToCursor=!1;a!==null&&(this.screenSpacePanning?this.target.set(0,0,-1).transformDirection(this.object.matrix).multiplyScalar(a).add(this.object.position):(la.origin.copy(this.object.position),la.direction.set(0,0,-1).transformDirection(this.object.matrix),Math.abs(this.object.up.dot(la.direction))<Pv?this.object.lookAt(this.target):(sf.setFromNormalAndCoplanarPoint(this.object.up,this.target),la.intersectPlane(sf,this.target))))}else if(this.object.isOrthographicCamera){const a=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),a!==this.object.zoom&&(this.object.updateProjectionMatrix(),r=!0)}return this._scale=1,this._performCursorZoom=!1,r||this._lastPosition.distanceToSquared(this.object.position)>To||8*(1-this._lastQuaternion.dot(this.object.quaternion))>To||this._lastTargetPosition.distanceToSquared(this.target)>To?(this.dispatchEvent(nf),this._lastPosition.copy(this.object.position),this._lastQuaternion.copy(this.object.quaternion),this._lastTargetPosition.copy(this.target),!0):!1}_getAutoRotationAngle(e){return e!==null?cn/60*this.autoRotateSpeed*e:cn/60/60*this.autoRotateSpeed}_getZoomScale(e){const t=Math.abs(e*.01);return Math.pow(.95,this.zoomSpeed*t)}_rotateLeft(e){this._sphericalDelta.theta-=e}_rotateUp(e){this._sphericalDelta.phi-=e}_panLeft(e,t){Ft.setFromMatrixColumn(t,0),Ft.multiplyScalar(-e),this._panOffset.add(Ft)}_panUp(e,t){this.screenSpacePanning===!0?Ft.setFromMatrixColumn(t,1):(Ft.setFromMatrixColumn(t,0),Ft.crossVectors(this.object.up,Ft)),Ft.multiplyScalar(e),this._panOffset.add(Ft)}_pan(e,t){const n=this.domElement;if(this.object.isPerspectiveCamera){const s=this.object.position;Ft.copy(s).sub(this.target);let r=Ft.length();r*=Math.tan(this.object.fov/2*Math.PI/180),this._panLeft(2*e*r/n.clientHeight,this.object.matrix),this._panUp(2*t*r/n.clientHeight,this.object.matrix)}else this.object.isOrthographicCamera?(this._panLeft(e*(this.object.right-this.object.left)/this.object.zoom/n.clientWidth,this.object.matrix),this._panUp(t*(this.object.top-this.object.bottom)/this.object.zoom/n.clientHeight,this.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),this.enablePan=!1)}_dollyOut(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale/=e:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_dollyIn(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale*=e:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_updateZoomParameters(e,t){if(!this.zoomToCursor)return;this._performCursorZoom=!0;const n=this.domElement.getBoundingClientRect(),s=e-n.left,r=t-n.top,a=n.width,o=n.height;this._mouse.x=s/a*2-1,this._mouse.y=-(r/o)*2+1,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()}_clampDistance(e){return Math.max(this.minDistance,Math.min(this.maxDistance,e))}_handleMouseDownRotate(e){this._rotateStart.set(e.clientX,e.clientY)}_handleMouseDownDolly(e){this._updateZoomParameters(e.clientX,e.clientX),this._dollyStart.set(e.clientX,e.clientY)}_handleMouseDownPan(e){this._panStart.set(e.clientX,e.clientY)}_handleMouseMoveRotate(e){this._rotateEnd.set(e.clientX,e.clientY),this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const t=this.domElement;this._rotateLeft(cn*this._rotateDelta.x/t.clientHeight),this._rotateUp(cn*this._rotateDelta.y/t.clientHeight),this._rotateStart.copy(this._rotateEnd),this.update()}_handleMouseMoveDolly(e){this._dollyEnd.set(e.clientX,e.clientY),this._dollyDelta.subVectors(this._dollyEnd,this._dollyStart),this._dollyDelta.y>0?this._dollyOut(this._getZoomScale(this._dollyDelta.y)):this._dollyDelta.y<0&&this._dollyIn(this._getZoomScale(this._dollyDelta.y)),this._dollyStart.copy(this._dollyEnd),this.update()}_handleMouseMovePan(e){this._panEnd.set(e.clientX,e.clientY),this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd),this.update()}_handleMouseWheel(e){this._updateZoomParameters(e.clientX,e.clientY),e.deltaY<0?this._dollyIn(this._getZoomScale(e.deltaY)):e.deltaY>0&&this._dollyOut(this._getZoomScale(e.deltaY)),this.update()}_handleKeyDown(e){let t=!1;switch(e.code){case this.keys.UP:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateUp(cn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,this.keyPanSpeed),t=!0;break;case this.keys.BOTTOM:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateUp(-cn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,-this.keyPanSpeed),t=!0;break;case this.keys.LEFT:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateLeft(cn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(this.keyPanSpeed,0),t=!0;break;case this.keys.RIGHT:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateLeft(-cn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(-this.keyPanSpeed,0),t=!0;break}t&&(e.preventDefault(),this.update())}_handleTouchStartRotate(e){if(this._pointers.length===1)this._rotateStart.set(e.pageX,e.pageY);else{const t=this._getSecondPointerPosition(e),n=.5*(e.pageX+t.x),s=.5*(e.pageY+t.y);this._rotateStart.set(n,s)}}_handleTouchStartPan(e){if(this._pointers.length===1)this._panStart.set(e.pageX,e.pageY);else{const t=this._getSecondPointerPosition(e),n=.5*(e.pageX+t.x),s=.5*(e.pageY+t.y);this._panStart.set(n,s)}}_handleTouchStartDolly(e){const t=this._getSecondPointerPosition(e),n=e.pageX-t.x,s=e.pageY-t.y,r=Math.sqrt(n*n+s*s);this._dollyStart.set(0,r)}_handleTouchStartDollyPan(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enablePan&&this._handleTouchStartPan(e)}_handleTouchStartDollyRotate(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enableRotate&&this._handleTouchStartRotate(e)}_handleTouchMoveRotate(e){if(this._pointers.length==1)this._rotateEnd.set(e.pageX,e.pageY);else{const n=this._getSecondPointerPosition(e),s=.5*(e.pageX+n.x),r=.5*(e.pageY+n.y);this._rotateEnd.set(s,r)}this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const t=this.domElement;this._rotateLeft(cn*this._rotateDelta.x/t.clientHeight),this._rotateUp(cn*this._rotateDelta.y/t.clientHeight),this._rotateStart.copy(this._rotateEnd)}_handleTouchMovePan(e){if(this._pointers.length===1)this._panEnd.set(e.pageX,e.pageY);else{const t=this._getSecondPointerPosition(e),n=.5*(e.pageX+t.x),s=.5*(e.pageY+t.y);this._panEnd.set(n,s)}this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd)}_handleTouchMoveDolly(e){const t=this._getSecondPointerPosition(e),n=e.pageX-t.x,s=e.pageY-t.y,r=Math.sqrt(n*n+s*s);this._dollyEnd.set(0,r),this._dollyDelta.set(0,Math.pow(this._dollyEnd.y/this._dollyStart.y,this.zoomSpeed)),this._dollyOut(this._dollyDelta.y),this._dollyStart.copy(this._dollyEnd);const a=(e.pageX+t.x)*.5,o=(e.pageY+t.y)*.5;this._updateZoomParameters(a,o)}_handleTouchMoveDollyPan(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enablePan&&this._handleTouchMovePan(e)}_handleTouchMoveDollyRotate(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enableRotate&&this._handleTouchMoveRotate(e)}_addPointer(e){this._pointers.push(e.pointerId)}_removePointer(e){delete this._pointerPositions[e.pointerId];for(let t=0;t<this._pointers.length;t++)if(this._pointers[t]==e.pointerId){this._pointers.splice(t,1);return}}_isTrackingPointer(e){for(let t=0;t<this._pointers.length;t++)if(this._pointers[t]==e.pointerId)return!0;return!1}_trackPointer(e){let t=this._pointerPositions[e.pointerId];t===void 0&&(t=new Le,this._pointerPositions[e.pointerId]=t),t.set(e.pageX,e.pageY)}_getSecondPointerPosition(e){const t=e.pointerId===this._pointers[0]?this._pointers[1]:this._pointers[0];return this._pointerPositions[t]}_customWheelEvent(e){const t=e.deltaMode,n={clientX:e.clientX,clientY:e.clientY,deltaY:e.deltaY};switch(t){case 1:n.deltaY*=16;break;case 2:n.deltaY*=100;break}return e.ctrlKey&&!this._controlActive&&(n.deltaY*=10),n}}function Iv(i){this.enabled!==!1&&(this._pointers.length===0&&(this.domElement.setPointerCapture(i.pointerId),this.domElement.ownerDocument.addEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.addEventListener("pointerup",this._onPointerUp)),!this._isTrackingPointer(i)&&(this._addPointer(i),i.pointerType==="touch"?this._onTouchStart(i):this._onMouseDown(i),this._cursorStyle==="grab"&&(this.domElement.style.cursor="grabbing")))}function Lv(i){this.enabled!==!1&&(i.pointerType==="touch"?this._onTouchMove(i):this._onMouseMove(i))}function Uv(i){switch(this._removePointer(i),this._pointers.length){case 0:this.domElement.releasePointerCapture(i.pointerId),this.domElement.ownerDocument.removeEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.removeEventListener("pointerup",this._onPointerUp),this.dispatchEvent(Bu),this.state=ht.NONE,this._cursorStyle==="grab"&&(this.domElement.style.cursor="grab");break;case 1:const e=this._pointers[0],t=this._pointerPositions[e];this._onTouchStart({pointerId:e,pageX:t.x,pageY:t.y});break}}function Nv(i){let e;switch(i.button){case 0:e=this.mouseButtons.LEFT;break;case 1:e=this.mouseButtons.MIDDLE;break;case 2:e=this.mouseButtons.RIGHT;break;default:e=-1}switch(e){case Ls.DOLLY:if(this.enableZoom===!1)return;this._handleMouseDownDolly(i),this.state=ht.DOLLY;break;case Ls.ROTATE:if(i.ctrlKey||i.metaKey||i.shiftKey){if(this.enablePan===!1)return;this._handleMouseDownPan(i),this.state=ht.PAN}else{if(this.enableRotate===!1)return;this._handleMouseDownRotate(i),this.state=ht.ROTATE}break;case Ls.PAN:if(i.ctrlKey||i.metaKey||i.shiftKey){if(this.enableRotate===!1)return;this._handleMouseDownRotate(i),this.state=ht.ROTATE}else{if(this.enablePan===!1)return;this._handleMouseDownPan(i),this.state=ht.PAN}break;default:this.state=ht.NONE}this.state!==ht.NONE&&this.dispatchEvent(vc)}function Fv(i){switch(this.state){case ht.ROTATE:if(this.enableRotate===!1)return;this._handleMouseMoveRotate(i);break;case ht.DOLLY:if(this.enableZoom===!1)return;this._handleMouseMoveDolly(i);break;case ht.PAN:if(this.enablePan===!1)return;this._handleMouseMovePan(i);break}}function Ov(i){this.enabled===!1||this.enableZoom===!1||this.state!==ht.NONE||(i.preventDefault(),this.dispatchEvent(vc),this._handleMouseWheel(this._customWheelEvent(i)),this.dispatchEvent(Bu))}function Bv(i){this.enabled!==!1&&this._handleKeyDown(i)}function zv(i){switch(this._trackPointer(i),this._pointers.length){case 1:switch(this.touches.ONE){case Ds.ROTATE:if(this.enableRotate===!1)return;this._handleTouchStartRotate(i),this.state=ht.TOUCH_ROTATE;break;case Ds.PAN:if(this.enablePan===!1)return;this._handleTouchStartPan(i),this.state=ht.TOUCH_PAN;break;default:this.state=ht.NONE}break;case 2:switch(this.touches.TWO){case Ds.DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchStartDollyPan(i),this.state=ht.TOUCH_DOLLY_PAN;break;case Ds.DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchStartDollyRotate(i),this.state=ht.TOUCH_DOLLY_ROTATE;break;default:this.state=ht.NONE}break;default:this.state=ht.NONE}this.state!==ht.NONE&&this.dispatchEvent(vc)}function kv(i){switch(this._trackPointer(i),this.state){case ht.TOUCH_ROTATE:if(this.enableRotate===!1)return;this._handleTouchMoveRotate(i),this.update();break;case ht.TOUCH_PAN:if(this.enablePan===!1)return;this._handleTouchMovePan(i),this.update();break;case ht.TOUCH_DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchMoveDollyPan(i),this.update();break;case ht.TOUCH_DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchMoveDollyRotate(i),this.update();break;default:this.state=ht.NONE}}function Vv(i){this.enabled!==!1&&i.preventDefault()}function Gv(i){i.key==="Control"&&(this._controlActive=!0,this.domElement.getRootNode().addEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function Hv(i){i.key==="Control"&&(this._controlActive=!1,this.domElement.getRootNode().removeEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}class rs{constructor(e){this.playerMeshes=new Map,this.playerVisuals=new Map,this.enemyMeshes=new Map,this.enemyVisuals=new Map,this.animationId=0,this.cameraInitialized=!1,this.localPlayerId=null,this.VISION_RADIUS=15,this.onResize=()=>{this.camera.aspect=window.innerWidth/window.innerHeight,this.camera.updateProjectionMatrix(),this.renderer.setSize(window.innerWidth,window.innerHeight)},this.animate=()=>{this.animationId=requestAnimationFrame(this.animate),this.updateInterpolatedPlayers(),this.renderFogOfWar(),this.renderer.render(this.scene,this.camera)},this.container=e,this.scene=new Df,this.scene.background=new He(657930),this.camera=new hn(45,window.innerWidth/window.innerHeight,.1,1e3),this.camera.position.set(0,30,30),this.renderer=new Zf({antialias:!0,alpha:!1}),this.renderer.setPixelRatio(Math.min(window.devicePixelRatio,2)),this.renderer.setSize(window.innerWidth,window.innerHeight),this.renderer.shadowMap.enabled=!0,this.renderer.shadowMap.type=hf,this.container.appendChild(this.renderer.domElement),this.controls=new Dv(this.camera,this.renderer.domElement),this.controls.enableDamping=!0,this.controls.dampingFactor=.05,this.controls.maxPolarAngle=Math.PI/2.1,this.controls.minDistance=8,this.controls.maxDistance=80,this.controls.enablePan=!1,this.createLights(),this.createTabletopBoard(),this.createFogOfWar(),this.createTargetingReticle(),this.createAxes(),this.townGateMesh=this.createTownGate(),window.addEventListener("resize",this.onResize),this.animate()}createLights(){const e=new Hf(16777215,.3);this.scene.add(e);const t=new Gf(16772829,2.8);t.position.set(10,50,10),t.castShadow=!0,t.shadow.mapSize.width=2048,t.shadow.mapSize.height=2048,t.shadow.camera.left=-60,t.shadow.camera.right=60,t.shadow.camera.top=60,t.shadow.camera.bottom=-60,t.shadow.bias=-5e-4,this.scene.add(t)}createTabletopBoard(){const e=new Nn,t=new Mt(104,4,104),n=new Pt({color:4007959,roughness:.9}),s=new Ie(t,n);s.position.y=-2,s.receiveShadow=!0,s.castShadow=!0,e.add(s);const r=new An(100,100),a=new Pt({color:1975328,roughness:.8}),o=new Ie(r,a);o.rotation.x=-Math.PI/2,o.position.y=.01,o.receiveShadow=!0,e.add(o);const l=new mp(100,50,5596757,2241314);l.position.y=.02,e.add(l),this.scene.add(e)}createFogOfWar(){this.fogCanvas=document.createElement("canvas"),this.fogCanvas.width=1024,this.fogCanvas.height=1024,this.fogCtx=this.fogCanvas.getContext("2d"),this.fogCtx.fillStyle="#0a0a0a",this.fogCtx.fillRect(0,0,1024,1024),this.fogTexture=new yl(this.fogCanvas);const e=new An(100,100),t=new Fs({map:this.fogTexture,transparent:!0,opacity:.98,depthWrite:!1});this.fogMesh=new Ie(e,t),this.fogMesh.rotation.x=-Math.PI/2,this.fogMesh.position.y=3.5,this.scene.add(this.fogMesh)}createTargetingReticle(){const e=new on(1,1,.05,32),t=new Fs({color:43775,transparent:!0,opacity:.6,depthWrite:!1});this.reticleMesh=new Ie(e,t),this.reticleMesh.visible=!1,this.scene.add(this.reticleMesh)}updateReticle(e,t,n,s){this.reticleMesh.visible=s,s&&(this.reticleMesh.position.set(e,.05,t),this.reticleMesh.scale.set(n,1,n))}createAxes(){const e=new gp(5);this.scene.add(e)}createTownGate(){const e=new on(1.5,1.5,3,6),t=new Pt({color:16755200,metalness:.5,roughness:.2}),n=new Ie(e,t);return n.position.set(-8,1.5,0),n.castShadow=!0,n.receiveShadow=!0,this.scene.add(n),n}createNameLabel(e){const t=document.createElement("canvas");t.dataset.labelText=e;const n=t.getContext("2d");if(!n)throw new Error("Could not create label canvas context");const s=28,r=16,a=10;n.font=`bold ${s}px Arial`;const o=Math.ceil(n.measureText(e).width);t.width=o+r*2,t.height=s+a*2,n.font=`bold ${s}px Arial`,n.textAlign="center",n.textBaseline="middle",n.fillStyle="rgba(0, 0, 0, 0.75)",this.roundRect(n,0,0,t.width,t.height,12),n.fill(),n.fillStyle="#ffffff",n.fillText(e,t.width/2,t.height/2);const l=new yl(t);l.minFilter=$t,l.generateMipmaps=!1;const c=new ui({map:l,transparent:!0,depthWrite:!1}),h=new Nf(c);return h.scale.set(3.2,1,1),h}roundRect(e,t,n,s,r,a){e.beginPath(),e.moveTo(t+a,n),e.lineTo(t+s-a,n),e.quadraticCurveTo(t+s,n,t+s,n+a),e.lineTo(t+s,n+r-a),e.quadraticCurveTo(t+s,n+r,t+s-a,n+r),e.lineTo(t+a,n+r),e.quadraticCurveTo(t,n+r,t,n+r-a),e.lineTo(t,n+a),e.quadraticCurveTo(t,n,t+a,n),e.closePath()}addPlayer(e,t,n=t?"You":"Player"){if(this.playerVisuals.has(e))return;const s=new Mt(1.2,2,1.2),r=new Pt({color:t?16729156:2280550,roughness:.4,metalness:.1}),a=new Ie(s,r);a.position.set(0,1,0),a.castShadow=!0,a.receiveShadow=!0;const o=this.createNameLabel(n);o.position.set(0,3.2,0),a.add(o),this.scene.add(a),this.playerMeshes.set(e,a),this.playerVisuals.set(e,{mesh:a,labelSprite:o,targetPosition:new O(0,1,0)})}removePlayer(e){const t=this.playerVisuals.get(e);t&&(this.scene.remove(t.mesh),this.playerVisuals.delete(e),this.playerMeshes.delete(e))}updatePlayer(e,t,n,s){const r=this.playerVisuals.get(e);if(r&&(r.targetPosition.set(t,1,n),s&&r.labelSprite.material instanceof ui&&r.labelSprite.material.map?.image?.dataset?.labelText!==s)){const c=this.createNameLabel(s),h=r.labelSprite.material;r.mesh.remove(r.labelSprite),h.map?.dispose(),h.dispose(),r.labelSprite=c,r.labelSprite.position.set(0,3.2,0),r.mesh.add(r.labelSprite)}}addEnemy(e,t="Enemy"){if(this.enemyVisuals.has(e))return;const n=new on(.8,.8,1.6,8),s=new Pt({color:16768307,roughness:.3}),r=new Ie(n,s);r.position.set(0,.8,0),r.castShadow=!0,r.receiveShadow=!0;const a=this.createNameLabel(t);a.position.set(0,2.6,0),r.add(a);const o=new on(1,1,.05,32),l=new Fs({color:16711680,transparent:!0,opacity:.4,depthWrite:!1}),c=new Ie(o,l);c.position.set(0,-.75,0),c.visible=!1,r.add(c),this.scene.add(r),this.enemyMeshes.set(e,r),this.enemyVisuals.set(e,{mesh:r,labelSprite:a,targetPosition:new O(0,.8,0),telegraphMesh:c})}removeEnemy(e){const t=this.enemyVisuals.get(e);t&&(this.scene.remove(t.mesh),this.enemyVisuals.delete(e),this.enemyMeshes.delete(e))}updateEnemy(e,t,n,s,r,a){const o=this.enemyVisuals.get(e);if(o&&(o.targetPosition.set(t,.8,n),r==="windup"?(o.telegraphMesh.visible=!0,o.telegraphMesh.scale.set(a,1,a)):o.telegraphMesh.visible=!1,s&&o.labelSprite.material instanceof ui&&o.labelSprite.material.map?.image?.dataset?.labelText!==s)){const u=this.createNameLabel(s),f=o.labelSprite.material;o.mesh.remove(o.labelSprite),f.map?.dispose(),f.dispose(),o.labelSprite=u,o.labelSprite.position.set(0,2.6,0),o.mesh.add(o.labelSprite)}}updateInterpolatedPlayers(){for(const e of this.playerVisuals.values())e.mesh.position.lerp(e.targetPosition,.4);for(const e of this.enemyVisuals.values())e.mesh.position.lerp(e.targetPosition,.4),e.telegraphMesh.visible&&e.telegraphMesh.material instanceof tn&&(e.telegraphMesh.material.opacity=.4+Math.sin(Date.now()*.01)*.2);this.reticleMesh.visible&&this.reticleMesh.material instanceof tn&&(this.reticleMesh.material.opacity=.5+Math.sin(Date.now()*.008)*.2)}renderFogOfWar(){if(!this.localPlayerId)return;const e=this.playerVisuals.get(this.localPlayerId);if(!e)return;const t=e.mesh.position.x,n=e.mesh.position.z,s=(t+50)/100*1024,r=(n+50)/100*1024,a=this.VISION_RADIUS/100*1024;this.fogCtx.globalCompositeOperation="destination-out";const o=this.fogCtx.createRadialGradient(s,r,0,s,r,a);o.addColorStop(0,"rgba(0, 0, 0, 1)"),o.addColorStop(.7,"rgba(0, 0, 0, 1)"),o.addColorStop(1,"rgba(0, 0, 0, 0)"),this.fogCtx.fillStyle=o,this.fogCtx.beginPath(),this.fogCtx.arc(s,r,a,0,Math.PI*2),this.fogCtx.fill(),this.fogTexture.needsUpdate=!0;for(const l of this.enemyVisuals.values())e.mesh.position.distanceTo(l.mesh.position)>this.VISION_RADIUS?l.mesh.visible=!1:l.mesh.visible=!0}updateCameraFollow(e){this.localPlayerId=e;const t=this.playerVisuals.get(e);if(!t)return;const n=t.mesh.position.x,s=t.mesh.position.z;if(!this.cameraInitialized)this.controls.target.set(n,0,s),this.camera.position.set(n,25,s+20),this.cameraInitialized=!0;else{const a=(n-this.controls.target.x)*.08,o=(s-this.controls.target.z)*.08;this.controls.target.x+=a,this.controls.target.z+=o,this.camera.position.x+=a,this.camera.position.z+=o}this.controls.update()}isNearTownGate(e,t){const n=e-this.townGateMesh.position.x,s=t-this.townGateMesh.position.z;return Math.sqrt(n*n+s*s)<3}dispose(){cancelAnimationFrame(this.animationId),window.removeEventListener("resize",this.onResize);for(const e of this.playerVisuals.values())e.labelSprite.material instanceof ui&&(e.labelSprite.material.map?.dispose(),e.labelSprite.material.dispose()),e.mesh.material instanceof tn&&e.mesh.material.dispose(),e.mesh.geometry.dispose();for(const e of this.enemyVisuals.values())e.labelSprite.material instanceof ui&&(e.labelSprite.material.map?.dispose(),e.labelSprite.material.dispose()),e.mesh.material instanceof tn&&e.mesh.material.dispose(),e.telegraphMesh.material instanceof tn&&e.telegraphMesh.material.dispose(),e.telegraphMesh.geometry.dispose(),e.mesh.geometry.dispose();this.playerMeshes.clear(),this.playerVisuals.clear(),this.enemyMeshes.clear(),this.enemyVisuals.clear(),this.fogTexture&&this.fogTexture.dispose(),this.fogMesh&&(this.fogMesh.geometry.dispose(),this.fogMesh.material.dispose()),this.reticleMesh&&(this.reticleMesh.geometry.dispose(),this.reticleMesh.material.dispose()),this.controls.dispose(),this.renderer.dispose(),this.renderer.domElement.parentElement===this.container&&this.container.removeChild(this.renderer.domElement)}}console.log("TOWN:",_c[Symbol.metadata]);console.log("PLAYER:",Oa[Symbol.metadata]);console.log("SCENERY:",gc[Symbol.metadata]);const rf="Kirito",zu={strike:{label:"Strike",cost:1,description:"Melee hit in small area",aoeRadius:2.5},fireball:{label:"Fireball",cost:2,description:"Ranged explosion",aoeRadius:3.5},heal:{label:"Heal",cost:2,description:"Restore health",aoeRadius:0}};let It=null,Et=null,vn=null,dr=!1,Cn=null,ku=0,Il=0,Ll=0;const Ul=new Le,af=new pp,Wv=new fi(new O(0,1,0),0),Wt={w:!1,a:!1,s:!1,d:!1,ArrowUp:!1,ArrowDown:!1,ArrowLeft:!1,ArrowRight:!1,W:!1,A:!1,S:!1,D:!1},Rt={x:0,y:0,initialized:!1},Xv=[{minX:-4.5,maxX:4.5,minY:3.5,maxY:12.5},{minX:-6,maxX:6,minY:-30,maxY:-28.5},{minX:-5,maxX:-2,minY:-29.5,maxY:-26.5},{minX:2,maxX:5,minY:-29.5,maxY:-26.5},{minX:-63.4,maxX:-10.6,minY:-20.8,maxY:-18},{minX:-14,maxX:-11.2,minY:-20.8,maxY:-3.2},{minX:-14,maxX:-11.2,minY:3.2,maxY:20.8},{minX:-43.4,maxX:-10.6,minY:18,maxY:20.8},{minX:-42.8,maxX:-40,minY:-.8,maxY:20.8},{minX:-63.4,maxX:-40.6,minY:-2,maxY:.8},{minX:-62.8,maxX:-60,minY:-20.8,maxY:.8},{minX:-43,maxX:-21,minY:-17,maxY:-13},{minX:-53.8,maxX:-46.2,minY:-15.8,maxY:-8.2},{minX:-37.5,maxX:-30.5,minY:-5,maxY:1},{minX:-27.5,maxX:-20.5,minY:-5,maxY:1},{minX:-37.5,maxX:-30.5,minY:3,maxY:9},{minX:-27.5,maxX:-20.5,minY:3,maxY:9},{minX:-37.5,maxX:-30.5,minY:11,maxY:17},{minX:-27.5,maxX:-20.5,minY:11,maxY:17}];function of(i,e){for(const t of Xv)if(i>t.minX&&i<t.maxX&&e>t.minY&&e<t.maxY)return!0;return!1}function $v(){let i=document.getElementById("overlay");return i||(i=document.createElement("div"),i.id="overlay",i.style.position="fixed",i.style.top="12px",i.style.left="12px",i.style.padding="10px 12px",i.style.background="rgba(0, 0, 0, 0.55)",i.style.color="white",i.style.fontFamily="Arial, sans-serif",i.style.fontSize="14px",i.style.lineHeight="1.5",i.style.borderRadius="8px",i.style.zIndex="20",i.style.pointerEvents="none",document.body.appendChild(i)),i}function Yv(){let i=document.getElementById("cardBar");return i||(i=document.createElement("div"),i.id="cardBar",i.style.position="fixed",i.style.left="50%",i.style.bottom="18px",i.style.transform="translateX(-50%)",i.style.display="flex",i.style.gap="12px",i.style.alignItems="end",i.style.justifyContent="center",i.style.zIndex="30",document.body.appendChild(i)),i}function qv(i){for(;i.firstChild;)i.removeChild(i.firstChild)}function jv(i,e,t){i.send("move",{x:e,y:t})}function Vu(i,e,t,n){i.send("useCard",{cardId:e,targetX:t,targetY:n})}function yc(i){return Array.isArray(i)?i:typeof i.toArray=="function"?i.toArray():[]}function lf(i){return Array.isArray(i)||typeof i.length=="number"?i.length:typeof i.toArray=="function"?i.toArray().length:0}function cf(i,e){const t=()=>{for(const[r,a]of i.state.players.entries())e.playerMeshes.has(r)||e.addPlayer(r,r===i.sessionId,a.name),r!==i.sessionId&&e.updatePlayer(r,a.x,a.y,a.name);for(const r of Array.from(e.playerMeshes.keys()))i.state.players.has(r)||e.removePlayer(r)},n=()=>{if(e instanceof xc&&"scenery"in i.state){for(const[r,a]of i.state.scenery.entries())e.sceneryVisuals.has(r)||e.addScenery(r,a.kind,a.x,a.y,a.scale,a.rotation);for(const r of Array.from(e.sceneryVisuals.keys()))i.state.scenery.has(r)||e.removeScenery(r)}},s=()=>{if(e instanceof rs&&"enemies"in i.state){for(const[r,a]of i.state.enemies.entries()){const o=`${a.name} (${a.hp}/${a.maxHp})`;e.enemyMeshes.has(r)||e.addEnemy(r,o),e.updateEnemy(r,a.x,a.y,o,a.action,a.attackRadius)}for(const r of Array.from(e.enemyMeshes.keys()))i.state.enemies.has(r)||e.removeEnemy(r)}};i.onStateChange(()=>{t(),n(),s()}),t(),n(),s()}async function Nl(i){if(!(dr||vn===i)){dr=!0,Rt.initialized=!1,Cn=null;try{It&&(await It.leave(),It=null),Et&&(Et.dispose(),Et=null);const e=document.getElementById("app");if(!e)throw new Error("Missing #app container");if(qv(e),i==="town"){const t=await Cv(rf),n=new xc(e);It=t,Et=n,vn="town",cf(t,n)}else{const t=await Rv(rf),n=new rs(e);It=t,Et=n,vn="field",cf(t,n)}}finally{for(const e in Wt)Wt[e]=!1;dr=!1}}}function ga(i){if(!It||vn!=="field"||!(Et instanceof rs))return;const e=It.state.players.get(It.sessionId);if(!e)return;const n=yc(e.hand)[i];if(!n)return;const s=zu[n];if(!(!s||e.mana<s.cost)){if(s.aoeRadius===0){Vu(It,n),Cn=null,Et.updateReticle(0,0,0,!1);return}Cn=n,ku=s.aoeRadius}}function Zv(){window.addEventListener("keydown",i=>{Wt.hasOwnProperty(i.key)&&(Wt[i.key]=!0),!(!It||!Et||dr)&&vn==="field"&&(i.key==="1"&&ga(0),i.key==="2"&&ga(1),i.key==="3"&&ga(2),i.key==="Escape"&&Et instanceof rs&&(Cn=null,Et.updateReticle(0,0,0,!1)))}),window.addEventListener("keyup",i=>{Wt.hasOwnProperty(i.key)&&(Wt[i.key]=!1)}),window.addEventListener("mousemove",i=>{Ul.x=i.clientX/window.innerWidth*2-1,Ul.y=-(i.clientY/window.innerHeight)*2+1}),window.addEventListener("mousedown",i=>{if(!(!It||vn!=="field"||!(Et instanceof rs))){if(i.button===2&&Cn){Cn=null,Et.updateReticle(0,0,0,!1);return}i.button===0&&Cn&&(Vu(It,Cn,Il,Ll),Cn=null,Et.updateReticle(0,0,0,!1))}}),window.addEventListener("contextmenu",i=>i.preventDefault())}function Kv(){const i=Yv();if(!It||vn!=="field"){i.innerHTML="",i.style.display="none";return}const e=It.state.players.get(It.sessionId);if(!e){i.innerHTML="",i.style.display="none";return}const t=yc(e.hand);i.style.display="flex",i.innerHTML="",t.forEach((n,s)=>{const r=zu[n]??{label:n,cost:0,description:""},a=e.mana>=r.cost,o=Cn===n,l=document.createElement("button");l.type="button",l.style.width="150px",l.style.height="190px",l.style.borderRadius="16px",o?(l.style.border="3px solid #00aaff",l.style.boxShadow="0 0 20px rgba(0, 170, 255, 0.6)",l.style.transform="translateY(-10px)"):(l.style.border=a?"2px solid rgba(255,255,255,0.35)":"2px solid rgba(255,80,80,0.65)",l.style.boxShadow=a?"0 10px 28px rgba(0,0,0,0.35)":"0 10px 28px rgba(0,0,0,0.25)",l.style.transform="translateY(0)"),l.style.background=a?"linear-gradient(180deg, rgba(60,60,80,0.95), rgba(25,25,35,0.98))":"linear-gradient(180deg, rgba(70,35,35,0.96), rgba(30,18,18,0.98))",l.style.color="white",l.style.padding="12px",l.style.cursor=a?"pointer":"not-allowed",l.style.display="flex",l.style.flexDirection="column",l.style.justifyContent="space-between",l.style.opacity=a?"1":"0.7",l.style.fontFamily="Arial, sans-serif",l.style.textAlign="left";const c=document.createElement("div");c.innerHTML=`<div style="font-size:13px; opacity:0.8;">${s+1}</div><div style="font-size:22px; font-weight:700; margin-top:6px;">${r.label}</div>`;const h=document.createElement("div");h.innerHTML=`<div style="font-size:14px; opacity:0.92; line-height:1.35;">${r.description}</div>`;const u=document.createElement("div");u.innerHTML=`<div style="display:flex; justify-content:space-between; align-items:center; font-size:14px;"><span>Mana</span><span style="font-weight:700;">${r.cost}</span></div>`,l.appendChild(c),l.appendChild(h),l.appendChild(u),l.addEventListener("click",()=>{a&&ga(s)}),i.appendChild(l)})}function Jv(){const i=$v();let e=Date.now(),t=0;const n=7,s=50,r=()=>{const a=Date.now(),o=(a-e)/1e3;if(e=a,It&&Et&&vn){const l=It.state.players.get(It.sessionId);if(Cn&&Et instanceof rs){af.setFromCamera(Ul,Et.camera);const c=new O;af.ray.intersectPlane(Wv,c),c&&(Il=c.x,Ll=c.z,Et.updateReticle(Il,Ll,ku,!0))}if(l){if(Rt.initialized||(Rt.x=l.x,Rt.y=l.y,Rt.initialized=!0),!dr){let h=0,u=0;if((Wt.w||Wt.W||Wt.ArrowUp)&&(u-=1),(Wt.s||Wt.S||Wt.ArrowDown)&&(u+=1),(Wt.a||Wt.A||Wt.ArrowLeft)&&(h-=1),(Wt.d||Wt.D||Wt.ArrowRight)&&(h+=1),h!==0||u!==0){const f=Math.sqrt(h*h+u*u),d=n*o,g=Rt.x+h/f*d,v=Rt.y+u/f*d;let m=Rt.x,p=Rt.y;vn==="town"?(of(g,Rt.y)||(m=Math.max(-70,Math.min(70,g))),of(Rt.x,v)||(p=Math.max(-70,Math.min(70,v)))):(m=Math.max(-50,Math.min(50,g)),p=Math.max(-50,Math.min(50,v))),Rt.x=m,Rt.y=p,Et.updatePlayer(It.sessionId,Rt.x,Rt.y,l.name),a-t>s&&(jv(It,Rt.x,Rt.y),t=a),vn==="town"&&Et instanceof xc?Et.isNearPortal(Rt.x,Rt.y)&&Nl("field"):vn==="field"&&Et instanceof rs&&Et.isNearTownGate(Rt.x,Rt.y)&&Nl("town")}}let c="";if(vn==="town")c="Walk into the glowing portal to enter the field";else{const h=yc(l.hand),u=lf(l.deck),f=lf(l.discard);let d="";Cn?d='<div style="color:#00aaff; font-weight:bold; margin-top:6px;">AIMING: Left Click to Fire, Right Click to Cancel</div>':d='<div style="margin-top:6px;">Press 1, 2, or 3 to Aim a Card</div>',c=`
HP: ${l.hp}/${l.maxHp}<br>
Mana: ${l.mana}/${l.maxMana}<br>
Hand: ${h.join(", ")}<br>
Deck: ${u} | Discard: ${f}<br>
${d}
          `.trim()}i.innerHTML=`
<strong>SAO Tower</strong><br>
Zone: ${vn}<br>
Player: ${l.name}<br>
${c}
        `.trim(),Et.updateCameraFollow(It.sessionId)}}Kv(),requestAnimationFrame(r)};r()}async function Qv(){if(!document.getElementById("app"))throw new Error("Missing #app container");Zv(),Jv(),await Nl("town")}Qv().catch(i=>{console.error("Failed to boot game:",i)});
