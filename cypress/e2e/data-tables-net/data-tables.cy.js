beforeEach(() => {
  cy.viewport(850, 1220)
  Cypress.config('baseUrl', Cypress.env('dataTablesBaseUrl'))
});

describe('Test #1 - Accessing the website', () => {
  it('Check if the website is accessble', () => {
    cy.resetBrowser({ cookies: true, local: true, session: true });
    cy.visit('/')
    cy.url().should('include', 'https://datatables.net/')
  });
})

describe('Test #2 - Check if all components are present', () => {
  it('Check if the elements of a table are visible', () => {
    cy.get('.dt-container').should('be.visible')
    cy.get('.dt-length').should('be.visible')
    cy.get('.dt-search').should('be.visible')
    cy.get('table[id="example"]').should('be.visible')
    cy.get('table[id="example"]').find('thead').should('be.visible')
    cy.get('#example_info').should('be.visible')
  });
});

describe('Test #3 - Check if the proper labels are used on the table', () => {
  it('Check if the table has the proper labels', () => {
    cy.get('[data-dt-column="0"] > .dt-column-header > .dt-column-title').should('have.text', 'Name')
    cy.get('[data-dt-column="1"] > .dt-column-header > .dt-column-title').should('have.text', 'Position')
    cy.get('[data-dt-column="2"] > .dt-column-header > .dt-column-title').should('have.text', 'Office')
    cy.get('[data-dt-column="3"] > .dt-column-header > .dt-column-title').should('have.text', 'Age')
    cy.get('[data-dt-column="4"] > .dt-column-header > .dt-column-title').should('have.text', 'Start date')
    cy.get('[data-dt-column="5"] > .dt-column-header > .dt-column-title').should('have.text', 'Salary')
  });
})

describe('Test #4 - Check if the table contains 57 entries', () => {
  it('Check if the table shows all 57 entries', () => {
    cy.get('select[class="dt-input"]').select("100")
    cy.get('table[id="example"]').find('tbody').find('tr').should('have.length', 57)
  });
  it('Check if the message below that it shows the 57 entries', () => {
    cy.get('#example_info').should('contain', 'Showing 1 to 57 of 57 entries')
  });
});

describe('Test #5 - Check if all of the pages in the table can be navigated', () => {
  it('Check if the table can access all 57 entries', () => {
    const totalEntries = 57;
    const entriesPerPage = 10;
    const totalPages = Math.ceil(totalEntries / entriesPerPage); 

    cy.get('select[class="dt-input"]').select("10");

    for (let index = 0; index < totalPages; index++) {
      cy.get(`[data-dt-idx="${index}"]`).click();

      const start = index * entriesPerPage + 1;
      const end = Math.min(start + entriesPerPage - 1, totalEntries);
      const expectedRowCount = end - start + 1;

      cy.get('table[id="example"]').find('tbody').find('tr').should('have.length', expectedRowCount);
      cy.get('#example_info').should('contain', `Showing ${start} to ${end} of ${totalEntries} entries`);
    }
    cy.get(`[data-dt-idx="0"]`).click();
  });
  it('Check if the table can access the last page', () => {
    cy.get('select[class="dt-input"]').select("10")
    cy.get('[data-dt-idx="next"]').click()
    cy.get('[data-dt-idx="last"]').click()
    cy.get('table[id="example"]').find('tbody').find('tr').should('have.length', 7)
    cy.get('#example_info').should('contain', 'Showing 51 to 57 of 57 entries')
  });
  it('Check if the table can access the first page', () => {
    cy.get('select[class="dt-input"]').select("10")
    cy.get('[data-dt-idx="previous"]').click()
    cy.get('[data-dt-idx="first"]').click()
    cy.get('table[id="example"]').find('tbody').find('tr').should('have.length', 10)
    cy.get('#example_info').should('contain', 'Showing 1 to 10 of 57 entries')
  });
});

describe('Test #6 - Check if the table can display the first 10 entries', () => {
  it('Check if the first page has 10 entries', () => {
    cy.get('select[class="dt-input"]').select("10")
    cy.get('[data-dt-idx="0"]').click()
    cy.get('table[id="example"]').find('tbody').find('tr').should('have.length', 10)
  });
  it('Check if the message below that it shows the first 10 entries', () => {
    cy.get('#example_info').should('contain', 'Showing 1 to 10 of 57 entries')
  });
});

describe('Test #7 - Check if the table can display the first 25 entries', () => {
  it('Check if the first page has 25 entries', () => {
    cy.get('select[class="dt-input"]').select("25")
    cy.get('table[id="example"]').find('tbody').find('tr').should('have.length', 25)
  });
  it('Check if the message below that it shows the first 25 entries', () => {
    cy.get('#example_info').should('contain', 'Showing 1 to 25 of 57 entries')
  });
});

describe('Test #8 - Check if the table can display the first 50 entries', () => {
  it('Check if the first page has 25 entries', () => {
    cy.get('select[class="dt-input"]').select("50")
    cy.get('table[id="example"]').find('tbody').find('tr').should('have.length', 50)
  });
  it('Check if the message below that it shows the first 50 entries', () => {
    cy.get('#example_info').should('contain', 'Showing 1 to 50 of 57 entries')
  });
});

describe('Test #9 - Check if the table can be sorted in an ascending or descending order', () => {
  before(() => {
    cy.resetBrowser({ cookies: true, local: true, session: true });
    cy.visit('/')
    cy.viewport(850, 1220)
    cy.url().should('include', 'https://datatables.net/')
    cy.get('select[class="dt-input"]').select("100")
  });
  it('Check if the name can be arranged in a descending order', () => {
    cy.get('[data-dt-column="0"] > .dt-column-header > .dt-column-order').click()
    let arr = []
    cy.get('table[id="example"]').find('tbody').find('tr').each(($el) => {
      const element = $el.find('td').eq(0).text()
      arr.push(element)
    }).then(() => {
      cy.wrap(arr).should('deep.equal', [...arr].sort().reverse())
    })
  });
  it('Check if the name can be arranged in a ascending order', () => {
    cy.get('[data-dt-column="0"] > .dt-column-header > .dt-column-order').click()
    cy.get('[data-dt-column="0"] > .dt-column-header > .dt-column-order').click()
    let arr = []
    cy.get('table[id="example"]').find('tbody').find('tr').each(($el) => {
      const element = $el.find('td').eq(0).text()
      arr.push(element)
    }).then(() => {
      cy.wrap(arr).should('deep.equal', [...arr].sort())
    })
  });
  it('Check if the position can be arranged in a descending order', () => {
    cy.get('[data-dt-column="1"] > .dt-column-header > .dt-column-order').click()
    cy.get('[data-dt-column="1"] > .dt-column-header > .dt-column-order').click()
    let arr = []
    cy.get('table[id="example"]').find('tbody').find('tr').each(($el) => {
      const element = $el.find('td').eq(1).text()
      arr.push(element)
    }).then(() => {
      cy.wrap(arr).should('deep.equal', [...arr].sort().reverse())
    })
  });
  it('Check if the position can be arranged in a ascending order', () => {
    cy.get('[data-dt-column="1"] > .dt-column-header > .dt-column-order').click()
    cy.get('[data-dt-column="1"] > .dt-column-header > .dt-column-order').click()
    let arr = []
    cy.get('table[id="example"]').find('tbody').find('tr').each(($el) => {
      const element = $el.find('td').eq(1).text()
      arr.push(element)
    }).then(() => {
      cy.wrap(arr).should('deep.equal', [...arr].sort())
    })
  });
  it('Check if the office can be arranged in a descending order', () => {
    cy.get('[data-dt-column="2"] > .dt-column-header > .dt-column-order').click()
    cy.get('[data-dt-column="2"] > .dt-column-header > .dt-column-order').click()
    let arr = []
    cy.get('table[id="example"]').find('tbody').find('tr').each(($el) => {
      const element = $el.find('td').eq(2).text()
      arr.push(element)
    }).then(() => {
      cy.wrap(arr).should('deep.equal', [...arr].sort().reverse())
    })
  });
  it('Check if the office can be arranged in a ascending order', () => {
    cy.get('[data-dt-column="2"] > .dt-column-header > .dt-column-order').click()
    cy.get('[data-dt-column="2"] > .dt-column-header > .dt-column-order').click()
    let arr = []
    cy.get('table[id="example"]').find('tbody').find('tr').each(($el) => {
      const element = $el.find('td').eq(2).text()
      arr.push(element)
    }).then(() => {
      cy.wrap(arr).should('deep.equal', [...arr].sort())
    })
  });
  it('Check if the age can be arranged in a descending order', () => {
    cy.get('[data-dt-column="3"] > .dt-column-header > .dt-column-order').click()
    cy.get('[data-dt-column="3"] > .dt-column-header > .dt-column-order').click()
    let arr = []
    cy.get('table[id="example"]').find('tbody').find('tr').each(($el) => {
      const element = $el.find('td').eq(3).text()
      arr.push(element)
    }).then(() => {
      cy.wrap(arr).should('deep.equal', [...arr].sort().reverse())
    })
  });
  it('Check if the age can be arranged in a ascending order', () => {
    cy.get('[data-dt-column="3"] > .dt-column-header > .dt-column-order').click()
    cy.get('[data-dt-column="3"] > .dt-column-header > .dt-column-order').click()
    let arr = []
    cy.get('table[id="example"]').find('tbody').find('tr').each(($el) => {
      const element = $el.find('td').eq(3).text()
      arr.push(element)
    }).then(() => {
      cy.wrap(arr).should('deep.equal', [...arr].sort())
    })
  });
  it.skip('Check if the start date can be arranged in a descending order', () => {
    cy.get('[data-dt-column="4"] > .dt-column-header > .dt-column-order').click()
    cy.get('[data-dt-column="4"] > .dt-column-header > .dt-column-order').click()
    let arr = []
    cy.get('table[id="example"]').find('tbody').find('tr').each(($el) => {
      const element = $el.find('td').eq(4).text().trim()
      arr.push(element)
    }).then(() => {
      const parsedDates = arr.map(d => new Date(d).getTime());
      const sortedDates = [...parsedDates].sort((a, b) => b - a);
      cy.wrap(parsedDates).should('deep.equal', sortedDates)
    })
  });
  it.skip('Check if the start date can be arranged in a ascending order', () => {
    cy.get('[data-dt-column="4"] > .dt-column-header > .dt-column-order').click()
    cy.get('[data-dt-column="4"] > .dt-column-header > .dt-column-order').click()
    let arr = []
    cy.get('table[id="example"]').find('tbody').find('tr').each(($el) => {
      const element = $el.find('td').eq(4).text().trim()
      arr.push(element)
    }).then(() => {
      const parsedDates = arr.map(d => new Date(d).getTime());
      const sortedDates = [...parsedDates].sort((a, b) => a - b);
      cy.wrap(parsedDates).should('deep.equal', sortedDates)
    })
  });
  it.skip('Check if the salary can be arranged in a descending order', () => {
    cy.get('[data-dt-column="5"] > .dt-column-header > .dt-column-order').click()
    cy.get('[data-dt-column="5"] > .dt-column-header > .dt-column-order').click()
    let arr = []
    cy.get('table[id="example"]').find('tbody').find('tr').each(($el) => {
      const element = $el.find('td').eq(5).text()
      const number = parseFloat(element.replace(/[\$,]/g, ''));
      arr.push(number)
    }).then(() => {
      const sorted = [...arr].sort((a, b) => b - a);
      expect(arr).to.deep.equal(sorted);
    })
  });
  it.skip('Check if the salary can be arranged in a ascending order', () => {
    cy.get('[data-dt-column="5"] > .dt-column-header > .dt-column-order').click()
    cy.get('[data-dt-column="5"] > .dt-column-header > .dt-column-order').click()
    let arr = []
    cy.get('table[id="example"]').find('tbody').find('tr').each(($el) => {
      const element = $el.find('td').eq(5).text()
      const number = parseFloat(element.replace(/[\$,]/g, ''));
      arr.push(number)
    }).then(() => {
      const sorted = [...arr].sort((a, b) => a - b);
      expect(arr).to.deep.equal(sorted);
    })
  });
})
describe('Test #10 - Check if the table can be searched', () => {
  it('Check if the table returns a single entry based on a name', () => {
    cy.get('input[type="search"]').type('Shou Itou')
    cy.get('table[id="example"]').find('tbody').find('tr').should('have.length', 1)
    cy.get('#example_info').should('contain', 'Showing 1 to 1 of 1 entry')
  });
  it('Check if the table returns entries based on a position', () => {
    cy.get('input[type="search"]').clear()
    cy.get('input[type="search"]').type('Integration Specialist')
    cy.get('table[id="example"]').find('tbody').find('tr').should('have.length', 3)
    cy.get('#example_info').should('contain', 'Showing 1 to 3 of 3 entries')
  });
  it('Check if the table returns entries based on a number', () => {
    cy.get('input[type="search"]').clear()
    cy.get('input[type="search"]').type('34')
    cy.get('table[id="example"]').find('tbody').find('tr').should('have.length', 3)
    cy.get('#example_info').should('contain', 'Showing 1 to 3 of 3 entries')
  });
  it('Check if the table can return no entries', () => {
    cy.get('input[type="search"]').clear()
    cy.get('input[type="search"]').type('------')
    cy.get('table[id="example"]').find('tbody').find('tr').should('have.length', 1)
    cy.get('table[id="example"]').find('tbody').find('tr').should('contain', 'No matching records found')
    cy.get('#example_info').should('contain', 'Showing 0 to 0 of 0 entries')
  });
});