let fs=require('fs');
function Node(freq,letter,used,code,father){
	this.freq=freq;
	this.letter=letter;
	this.used=used;
	this.code=code;
	this.father=father;
};
let str=fs.readFileSync('input1.txt').toString();
let tree=new Array();
let alph=new Object();
let strcode='';
let strdecode='';
for (let i=0;i<str.length;i++){
	if (alph[str.charAt(i)]){
		alph[str.charAt(i)]++;
	}else{
		alph[str.charAt(i)]=1;
	}
}
for (let j in alph){
	let n =new Node (alph[j],j,0,undefined,null);
	tree.push(n);
}

let minind1=0,minind2=0;
let min1,min2;
let l=tree.length-1;
for (i=0; i<l;i++){
	min1=min2=1000000000000;
	for(let j=0;j<tree.length;j++){
		if (tree[j].freq<min1 && tree[j].used==0){
			min2=min1;
			min1=tree[j].freq;
			minind2=minind1;
			minind1=j;
			
			
		}
		else if (tree[j].freq<min2 && tree[j].used==0){
			min2=tree[j].freq;
			minind2=j;
		}//нужно понять как менять код у детей
	}
	let s=tree[minind1].letter.concat('',tree[minind2].letter);
	let f=tree[minind1].freq+tree[minind2].freq;
	let node12=new Node(f,s,0,undefined, null);
	tree[minind1].used=1;
	tree[minind2].used=1;
	tree.push(node12);
	tree[minind1].father=tree.length-1;
	tree[minind2].father=tree.length-1;
	tree[minind1].code=0;
	tree[minind2].code=1;
}

let codeletters=new Object;
let indintree;
let c;//код одной буквы
let x,k=0;//значение father

for (let l in alph){
	indintree=k;
	x=1;
	c='';
	while (x!=undefined){
		c=c.concat('',tree[indintree].code);
		
		indintree=tree[indintree].father;
		x=tree[indintree].code;
	}
	c=c.split('').reverse().join('');
	codeletters[l]=c;
	k++;
}




for (i=0;i<str.length;i++){
	strcode=strcode.concat('',codeletters[str.charAt(i)]);
}
fs.writeFileSync('code1.txt',strcode);
console.log('раскодированная строка сохранена в code1.txt');


let clvalues = Object.values(codeletters);
let clkeys = Object.keys(codeletters);
let decodestr='', dstr='';
for (j=0;j<strcode.length;j++){
	dstr=dstr.concat('',strcode.charAt(j));
	if (clvalues.includes(dstr)){
		decodestr=decodestr.concat('',clkeys[clvalues.indexOf(dstr)]);
		dstr='';
		
	}	
		
}
fs.writeFileSync('decode1.txt',decodestr);
console.log('раскодированная строка сохранена в decode1.txt');

	
	

		
	