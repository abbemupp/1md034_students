function MenuItem(name, img, kCal, stock, gluten, lactose)
{
    this.name = name;
    this.img = img;    
    this.kCal = kCal;
    this.stock = stock;
    this.gluten = gluten;
    this.lactose = lactose;
    return this;
}

function getNameAndCal(menuItem)
{
    return [menuItem.name, menuItem.kCal];
}

function getBurgerOrder()
{
    const burgerOrders = document.getElementsByClassName("burgerCheck");
    var burgerNames = [];
    var siblings = [];
    for (var i = 0; i < burgerOrders.length; ++i)
    {
        var element = burgerOrders[i];
        if (element.checked)
        {
            siblings = element.parentNode.childNodes;
            for (var j = 0,sibling;sibling=siblings[j];++j)
            {
                if (sibling.className == "menutitle")
                {
                    burgerNames.push(sibling.getAttribute("value"));
                }
            }
        }
    }
    return burgerNames;
}

function getOrderInfo()
{
    const delinfo = document.getElementById("deliveryInfo");
    var values = [];
    for (var i = 0; i < delinfo.length;++i)
    {
        var element = delinfo.elements[i];
        if (element.type == "radio" || element.type == "checkbox")
        {
            if (element.checked)
            {
                values.push(element.value);
            }
            else {}
        }
        else
        {
            values.push(element.value);
        }
    }
    values.pop(); // Removing button value   
    values = values.concat(getBurgerOrder());
    return values;
}
