/// <reference types = "cypress" />

it('Igualdade', () => {
    const a = 1;

    expect(a).equal(1)
    expect(a, 'Deveria ser 1').equal(1)
    expect(a).to.be.equal(1)
    expect(a).not.to.equal('b')
})

it('Verdadeiros our nao', () => {
    const a = true;
    const b = null;
    let c;

    expect(a).to.be.true;
    expect(true).to.be.true;
    expect(b).to.be.null;
    expect(a).to.be.not.null;
    expect(c).to.be.undefined;
})

it('Igualdade dos objetos', () => {
    const obj = {
        a: 1,
        b: 2
    }

    expect(obj).equal(obj)
    expect(obj).equals(obj)
    expect(obj).eq(obj)
    expect(obj).to.equal(obj)
    expect(obj).to.be.deep.equal({a: 1, b: 2})
    expect(obj).eql({a: 1, b: 2})
    expect(obj).include({a: 1})
    expect(obj).to.have.property('b', 2)
    expect(obj).to.not.be.empty
    expect({}).to.be.be.empty
})

it('Arrays', () =>{
    const arr = [1, 2 ,3]
    expect(arr).to.have.members([1, 2, 3])
    expect(arr).to.include.members([1, 2])
    expect(arr).to.not.be.empty
})

it('Tipos', () => {
    const num = 1
    const str = 'String'

    expect(num).to.be.a('number')
    expect(str).to.be.a('string')
    expect({}).to.be.an('object')
    expect([]).to.be.an('array')
})

it('String', () => {
    const str = 'String de teste'

    expect(str).to.be.equal('String de teste')
    expect(str).to.have.length([15])
    expect(str).to.contain('de')
    expect(str).to.match(/de/)
    //para indicar que deve iniciar com "String"
    expect(str).to.match(/^String/)
    //para indicar que deve finalizar com "teste"
    expect(str).to.match(/teste$/)
    //Outra maneira de validar a longitude do string
    expect(str).to.match(/.{15}/)

})

it('Numeros', () => {
    const number = 4
    const floatNumber = 5.2123

    expect(number).to.be.equal(4)
    expect(number).to.be.above(3)
    expect(number).to.be.below(7)
    expect(floatNumber).to.be.equal(5.2123)
    expect(floatNumber).to.be.closeTo(5.2, 0.1)
    expect(floatNumber).to.be.above(5)
})