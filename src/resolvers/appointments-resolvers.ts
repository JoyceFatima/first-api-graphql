import { Resolver, Query, Mutation, Arg, FieldResolver, Root } from "type-graphql";
import { CreateAppointmentInput } from "../dtos/inputs/create-appoitment-input";
import { Appointment } from "../dtos/models/appoitment-model";
import { Customer } from "../dtos/models/customer-model";

@Resolver(() => Appointment)
export class AppointmentsResolvers {

  @Query(() => [Appointment])
  async appointments() {
    return [{
      startsAt: new Date(),
      endsAt: new Date()

    }]
  }

  @Mutation(() => Appointment)
  async createAppointment(@Arg('data') data: CreateAppointmentInput) {
    const appointment = {
      startsAt: data.startsAt,
      endsAt: data.endsAt
    }

    return appointment
  }

  @FieldResolver(() => Customer)
  async customer(@Root() appointment: Appointment) {
    return {
      name: 'Joyce'
    }
  }
}