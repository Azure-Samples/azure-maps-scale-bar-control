---
page_type: sample
description: An Azure Maps Web SDK module that provides a control that displays a scale bar relative to the pixel resolution at the center of the map.
languages:
- javascript
- typescript
products:
- azure
- azure-maps
---

# Azure Maps Scale Bar Control module

An Azure Maps Web SDK module that provides a control that displays a scale bar relative to the pixel resolution at the center of the map.

**Samples**

[Simple Scale Bar Control](https://samples.azuremaps.com/?ample=simple-scale-bar-control)
<br/>[<img src="https://samples.azuremaps.com/controls/simple-scale-bar-control/screenshot.jpg" height="200px">](https://samples.azuremaps.com/?ample=simple-scale-bar-control)

## Getting started

Download the project and copy the `azure-maps-scale-bar-control` JavaScript file from the `dist` folder into your project. 

**Usage**

```JavaScript
//Add scale bar control to the map.
map.controls.add(new atlas.control.ScaleBarControl());
```

## API Reference

### ScaleBarControl class

Implements: `atlas.Control`

Namespace: `atlas.control`

A control that displays a scale bar relative to the pixel resolution at the center of the map.

**Contstructor**

> `ScaleBarControl(options?: ScaleBarControlOptions)`

### ScaleBarControlOptions interface

**Properties** 

| Name | Type | Description |
|------|------|-------------|
| `maxBarLength` | `number` | The maximum length of the scale bar in pixels. Default: `100` |
| `units` | `'imperial'` \| `'metric'` \| `'meters'` \| `'kilometers'` \| `'yards'` \| `'feet'` \| `'miles'` \| `'nauticalMiles'` | The distance units of the scale bar. Default: `'imperial'` |

## Related Projects

* [Azure Maps Web SDK Open modules](https://github.com/microsoft/Maps/blob/master/AzureMaps.md#open-web-sdk-modules) - A collection of open source modules that extend the Azure Maps Web SDK.
* [Azure Maps Web SDK Samples](https://github.com/Azure-Samples/AzureMapsCodeSamples)
* [Azure Maps Gov Cloud Web SDK Samples](https://github.com/Azure-Samples/AzureMapsGovCloudCodeSamples)
* [Azure Maps & Azure Active Directory Samples](https://github.com/Azure-Samples/Azure-Maps-AzureAD-Samples)
* [List of open-source Azure Maps projects](https://github.com/microsoft/Maps/blob/master/AzureMaps.md)

## Additional Resources

* [Azure Maps (main site)](https://azure.com/maps)
* [Azure Maps Documentation](https://docs.microsoft.com/azure/azure-maps/index)
* [Azure Maps Blog](https://azure.microsoft.com/blog/topics/azure-maps/)
* [Microsoft Q&A](https://docs.microsoft.com/answers/topics/azure-maps.html)
* [Azure Maps feedback](https://feedback.azure.com/forums/909172-azure-maps)

## Contributing

We welcome contributions. Feel free to submit code samples, file issues and pull requests on the repo and we'll address them as we can. 
Learn more about how you can help on our [Contribution Rules & Guidelines](https://github.com/Azure-Samples/azure-maps-scale-bar-control/blob/main/CONTRIBUTING.md). 

You can reach out to us anytime with questions and suggestions using our communities below:
* [Microsoft Q&A](https://docs.microsoft.com/answers/topics/azure-maps.html)
* [Azure Maps feedback](https://feedback.azure.com/forums/909172-azure-maps)

This project has adopted the [Microsoft Open Source Code of Conduct](https://opensource.microsoft.com/codeofconduct/). 
For more information, see the [Code of Conduct FAQ](https://opensource.microsoft.com/codeofconduct/faq/) or 
contact [opencode@microsoft.com](mailto:opencode@microsoft.com) with any additional questions or comments.

## License

MIT
 
See [License](https://github.com/Azure-Samples/azure-maps-scale-bar-control/blob/main/LICENSE.md) for full license text.