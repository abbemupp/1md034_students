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

function getOrderInfo()
{
    const delinfo = document.getElementById("deliveryInfo");
    var values = [];
    for (var i = 0; i < delinfo.length;++i)
    {
        var element = delinfo.elements[i];
        if (element.type == "radio")
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
    return values;
}
