const webViewJsCode = `
  function removeDiv() {
    document.getElementsByClassName('xs83m0k x1sy10c2 x1h5jrl4 xieb3on xmn8rco x1iy3rx x1n2onr6 x1j9u4d2 x1klvvdw x1wqampe')[0].style.display='none'
    document.getElementsByClassName('x1i10hfl x972fbf xcfux6l x1qhh985 xm0m39n x9f619 xe8uvvx xdj266r x11i5rnm xat24cr x1mh8g0r x16tdsg8 x1hl2dhg xggy1nq x1a2a7pz x6s0dn4 xjbqb8w x1ejq31n xd10rxx x1sy0etr x17r0tee x1ypdohk x78zum5 xl56j7k x1y1aw1k x1sxyh0 xwib8y2 xurb0ha xcdnw81')[4].click()
  }
  
  var interval = setInterval(function() {
    removeDiv();
    if (document.getElementsByClassName('xs83m0k x1sy10c2 x1h5jrl4 xieb3on xmn8rco x1iy3rx x1n2onr6 x1j9u4d2 x1klvvdw x1wqampe')[0].style.display='none' && !document.getElementsByClassName('x1i10hfl x972fbf xcfux6l x1qhh985 xm0m39n x9f619 xe8uvvx xdj266r x11i5rnm xat24cr x1mh8g0r x16tdsg8 x1hl2dhg xggy1nq x1a2a7pz x6s0dn4 xjbqb8w x1ejq31n xd10rxx x1sy0etr x17r0tee x1ypdohk x78zum5 xl56j7k x1y1aw1k x1sxyh0 xwib8y2 xurb0ha xcdnw81')[4]) {
      clearInterval(interval); 
    }
  }, 500);
`;

export { webViewJsCode };
