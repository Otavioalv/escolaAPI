export async function setReload() {
    const reload = {
        reload: true
    }
    localStorage.setItem('reload', JSON.stringify(reload));
}

export async function Reload() {
    const reloadObj = await getReloadPage();
    
    if(reloadObj.reload) {
        const reload = {
            reload: false
        }
        localStorage.setItem('reload', JSON.stringify(reload));

        window.location.reload();
    }
}

export async function getReloadPage() {
    const reloadStr:string = localStorage.getItem('reload') ?? '';
    const reloadObj = JSON.parse(reloadStr);
    
    return reloadObj;
}