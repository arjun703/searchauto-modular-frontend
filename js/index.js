const data = {

    facets: [
      {
        value: "price",
        type: "standard",
        label: "Price",
        options: [
          {
            value: "(, 50]",
            hits: 20,
            label: "less than $50"
          },
          {
            value: "(50, 100]",
            hits: 30,
            label: "$50 to $100"
          },
          {
            value: "(100, )",
            hits: 33,
            label: "$50 to $100"
          }
        ]
      },

      {
        value: "lift_height",
        type: "non_standard",
        label: "Lift Height",
        options: [
          {
            value: "1",
            hits: 20,
            label: "1",
            selected: true
          },
          {
            value: "4_4",
            hits: 30,
            label: "4_4"
          },
          {
            value: "10",
            hits: 33,
            label: "10"
          }
        ]
      },

      {
        value: "brand",
        type: "non_standard",
        label: "Brand",
        options: [
          {
            value: "bds-suspension",
            hits: 20,
            label: "BDS Suspension"
          },
          {
            value: "ford",
            hits: 30,
            selected: true,
            label: "Ford"
          },
          {
            value: "corvette",
            hits: 33,
            label: "Corvette"
          }
        ]
      },

      {
        value: "lift_weight",
        type: "non_standard",
        label: "Lift Weight",
        options: [
          {
            value: "1",
            hits: 20,
            label: "1"
          },
          {
            value: "4_4",
            hits: 30,
            label: "4_4"
          },
          {
            value: "10",
            selected: true,
            hits: 33,
            label: "10"
          }
        ]
      },     

      {
        value: "house_material",
        type: "non_standard",
        label: "House Material",
        options: [
          {
            value: "material-a",
            hits: 20,
            label: "Material A"
          },
          {
            value: "material-b",
            hits: 30,
            label: "Material B",
            selected: true
          },
          {
            value: "material-c",
            hits: 33,
            label: "Material C"
          }
        ]
      }
    ]
  };


displayFacetContent(data);