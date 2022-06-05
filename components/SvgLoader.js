const SvgLoader = () => {};

SvgLoader.prototype.getXml = (file) => {

    fetch(file).then((response) => response.text()).then((textContent) => {
        console.log(textContent);
        let xml = textContent.replace(/<path /g,"<path style=\"fill:#000000;\" ");
        xml = xml.replace(/circle/g,"circle style=\"fill:#000000;\" ");
        if (xml.includes("stroke")) xml = props.xml.replace(/style="fill:#000000;" /g,"");
        return xml;
    })
}


export default SvgLoader;