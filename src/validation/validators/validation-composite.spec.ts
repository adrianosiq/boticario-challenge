import faker from 'faker'
import { ValidationComposite } from './validation-composite'
import { MissingParamError, InvalidParamError } from '@/presentation/errors'
import { Validation } from '@/presentation/protocols/validation'

const field = faker.random.word()

const makeValidationStub = (): Validation => {
  class ValidationStub implements Validation {
    validate (input: any): Error {
      return null
    }
  }
  return new ValidationStub()
}

interface SutTypes {
  sut: ValidationComposite
  validationStubs: Validation[]
}

const makeSut = (): SutTypes => {
  const validationStubs = [
    makeValidationStub(),
    makeValidationStub()
  ]
  const sut = new ValidationComposite(validationStubs)
  return {
    sut,
    validationStubs
  }
}

describe('Validation Composite', () => {
  test('Should return an error if any validation fails', () => {
    const { sut, validationStubs } = makeSut()
    jest.spyOn(validationStubs[1], 'validate').mockReturnValueOnce(new MissingParamError(field))
    const error = sut.validate({ [field]: faker.random.word() })
    expect(error).toEqual(new MissingParamError(field))
  })

  test('Should return the first error if more then one validation fails', () => {
    const { sut, validationStubs } = makeSut()
    jest.spyOn(validationStubs[0], 'validate').mockReturnValueOnce(new InvalidParamError(field))
    jest.spyOn(validationStubs[1], 'validate').mockReturnValueOnce(new MissingParamError(field))
    const error = sut.validate({ [field]: faker.random.word() })
    expect(error).toEqual(new InvalidParamError(field))
  })

  test('Should not return if validation succeeds', () => {
    const { sut } = makeSut()
    const error = sut.validate({ [field]: faker.random.word() })
    expect(error).toBeFalsy()
  })
})
