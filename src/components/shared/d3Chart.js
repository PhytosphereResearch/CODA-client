import * as d3 from 'd3';
import * as topojson from 'topojson';
import ca from './caCountiesTopo.json';

const d3Chart = {};

d3Chart.create = function(el, props, state) {
  var svg = d3.select(el).append('svg')
      .attr('class', 'd3')
      .attr('width', props.width)
      .attr('height', props.height);

  var projection = d3.geoMercator()
    .scale(700)
    .center([-120, 37.3])
    .translate([props.width/2, props.height/2]);
  var path = d3.geoPath().projection(projection);

  svg.append("g")
    .attr("class", "states")
    .selectAll("path")
    .data(topojson.feature(ca, ca.objects.subunits).features)
    .enter().append("path")
    .attr("class", function(d) { return "subunit " + d.properties.name; })
    .attr("d", path);
  this.update(el, state);
};

d3Chart.update = function(el, state) {
  d3.selectAll('.subunit')
    .attr("class", function (d) {
      if (state.data.indexOf(d.properties.name) !== -1 && state.countiesByRegions.indexOf(d.properties.name) !== -1 ) {
        return "subunit " + d.properties.name + " inRange inInteraction";
      } else if (state.data.indexOf(d.properties.name) !== -1) {
        return "subunit " + d.properties.name + " inRange";
      }
      return "subunit " + d.properties.name;
    });
};

export default d3Chart;
