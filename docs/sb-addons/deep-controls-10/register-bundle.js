try{
(()=>{})();
}catch(e){ console.error("[Storybook] One of your manager-entries failed: " + import.meta.url, e); }
